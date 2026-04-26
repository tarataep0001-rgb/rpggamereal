import { writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const chromePath = path.join(
  process.env.LOCALAPPDATA ?? path.join(process.env.USERPROFILE ?? "", "AppData", "Local"),
  "ms-playwright",
  "chromium-1219",
  "chrome-win64",
  "chrome.exe",
);

const outputDir = path.join(process.cwd(), "output", "playwright");
const port = 9333;
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const screens = [
  { id: "home", buttonText: "Home" },
  { id: "character", buttonText: "Char" },
  { id: "team", buttonText: "Team" },
  { id: "stage", buttonText: "Stage" },
  { id: "gacha", buttonText: "Gacha" },
  { id: "inventory", buttonText: "Bag" },
  { id: "guild", buttonText: "Guild" },
  { id: "admin", buttonText: "Admin" },
  { id: "skills", buttonText: "Skill Priority" },
  { id: "battle", buttonText: "Battle Result" },
  { id: "idle", buttonText: "Idle Claim" },
  { id: "shop", buttonText: "Shop" },
  { id: "export", buttonText: "Export Readiness" },
  { id: "launch", buttonText: "Launch Gate" },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Keep polling until Chrome exposes the CDP endpoint.
    }
    await delay(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function createCdpClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  let nextId = 1;
  const pending = new Map();
  const events = [];

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) {
        reject(new Error(message.error.message));
      } else {
        resolve(message.result);
      }
      return;
    }
    if (message.method) {
      events.push(message);
    }
  });

  return new Promise((resolve, reject) => {
    socket.addEventListener("open", () => {
      resolve({
        events,
        send(method, params = {}) {
          const id = nextId++;
          socket.send(JSON.stringify({ id, method, params }));
          return new Promise((resolveSend, rejectSend) => {
            pending.set(id, { resolve: resolveSend, reject: rejectSend });
          });
        },
        close() {
          socket.close();
        },
      });
    });
    socket.addEventListener("error", () => reject(new Error("CDP WebSocket failed")));
  });
}

async function evaluate(client, expression, awaitPromise = true) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed");
  }

  return result.result.value;
}

async function capture(client, filename) {
  const result = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
  });
  await writeFile(path.join(outputDir, filename), Buffer.from(result.data, "base64"));
}

async function clickByText(client, text) {
  const clicked = await evaluate(
    client,
    `(async () => {
      const target = [...document.querySelectorAll("button")].find((button) =>
        button.textContent?.includes(${JSON.stringify(text)})
      );
      if (!target) return false;
      target.scrollIntoView({ block: "center", inline: "center" });
      target.click();
      await new Promise((resolve) => setTimeout(resolve, 350));
      return true;
    })()`,
  );
  return clicked;
}

async function inspectScreen(client, id) {
  const data = await evaluate(
    client,
    `(() => {
      const images = [...document.images].map((img) => {
        const rect = img.getBoundingClientRect();
        return {
          alt: img.alt,
          src: img.getAttribute("src"),
          currentSrc: img.currentSrc,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          visible: rect.width > 0 && rect.height > 0,
        };
      });
      return {
        screen: ${JSON.stringify(id)},
        title: document.querySelector("h1,h2")?.textContent ?? "",
        bodyHasReplacementChar: document.body.innerText.includes("�"),
        bodyHasMojibakeMarker: /เธ|เน\\uFFFD|โ\\uFFFD|ร—/.test(document.body.innerText),
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
        imageCount: images.length,
        brokenImages: images.filter((img) => img.visible && (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)),
        images,
      };
    })()`,
  );
  await capture(client, `debug-${id}.png`);
  return data;
}

const chrome = spawn(chromePath, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
], {
  stdio: "ignore",
});

try {
  const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
  const pageTarget = targets.find((target) => target.type === "page") ?? targets[0];
  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error("No Chrome page target found for CDP debugging");
  }
  const client = await createCdpClient(pageTarget.webSocketDebuggerUrl);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Log.enable");
  await client.send("Network.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await client.send("Page.navigate", { url: baseUrl });
  await delay(1000);

  const reports = [];
  for (const screen of screens) {
    if (screen.id !== "home") {
      const clicked = await clickByText(client, screen.buttonText);
      if (!clicked) {
        reports.push({
          screen: screen.id,
          navigationError: `Button text not found: ${screen.buttonText}`,
        });
        continue;
      }
    }
    reports.push(await inspectScreen(client, screen.id));
  }

  const networkErrors = client.events
    .filter((event) => event.method === "Network.loadingFailed")
    .map((event) => event.params);
  const logErrors = client.events
    .filter((event) => event.method === "Log.entryAdded")
    .map((event) => event.params.entry)
    .filter((entry) => ["error", "warning"].includes(entry.level));

  const summary = {
    checked_at: new Date().toISOString(),
    baseUrl,
    screensChecked: reports.length,
    screens: reports,
    networkErrors,
    logErrors,
  };

  await writeFile(
    path.join(outputDir, "debug-ui-render-report.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
  );
  console.log(JSON.stringify({
    screensChecked: reports.length,
    brokenImageScreens: reports
      .filter((report) => report.brokenImages?.length || report.navigationError)
      .map((report) => report.screen),
    overflowScreens: reports
      .filter((report) => report.horizontalOverflow)
      .map((report) => report.screen),
    mojibakeScreens: reports
      .filter((report) => report.bodyHasReplacementChar || report.bodyHasMojibakeMarker)
      .map((report) => report.screen),
    networkErrors: networkErrors.length,
    logErrors: logErrors.length,
  }, null, 2));
  client.close();
} finally {
  chrome.kill();
}
