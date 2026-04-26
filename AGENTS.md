# AGENTS.md - RPG PROJECT RULES

Active reference: MASTER GAME SPEC V2.8.7 FINAL AUDIT & IMPLEMENTATION-READINESS LOCK.

Older spec versions are historical only. Do not reintroduce older conflicting rules.

## Working Rules

1. Always inspect existing files before editing.
2. One phase = one focused change and one focused commit.
3. Do not rewrite unrelated files.
4. Do not remove existing working UI unless instructed.
5. Use TypeScript strictly.
6. Use Next.js App Router.
7. Use Tailwind CSS.
8. Keep mock data separate from UI components.
9. Keep mock data in `src/data` only.
10. Keep UI components reusable.
11. Do not implement real backend during frontend phases.
12. Do not implement real database logic during frontend phases.
13. Do not implement real WLD, withdrawal, blockchain, Paid Gem, ledger, or payment.
14. Do not store secrets.
15. Do not use production-like mock money paths.
16. Do not add mock code that could be mistaken for production money logic.
17. Keep disabled feature states visible in UI where relevant.
18. Run `npm run lint` and `npm run build` before reporting completion when possible.
19. Report changed files, summary, commands run, test results, and risks.
20. Do not claim simulation, legal, policy, security, or production-readiness completion without real evidence.
21. If uncertain, preserve safety and add a clearly labeled placeholder instead of guessing production logic.

## Locked V1A Feature State

- Chapter 1-5 only.
- Effective Level Cap = Lv50.
- Class 1 live only.
- Class 2 not live.
- Class 3 schema only.
- Box 1 only.
- Box 2 disabled except internal test.
- Box 3 disabled.
- Paid Gem Gacha disabled.
- WLD Withdraw disabled.
- WLD Reward Ranking disabled.
- Normal gear drop max Rare.
- Epic gear schema/test only.
- Region default restricted for WLD/Paid features.
- Free/Test Gem only for V1A gacha.
- No production financial logic.

## Locked Feature Flags

- `ENABLE_WLD_WITHDRAW=false`
- `ENABLE_WLD_REWARD_RANKING=false`
- Paid Gem Gacha disabled.
- Box 2 disabled except internal test.
- Box 3 disabled.
- Class 2 not live.
- Class 3 schema only.
