# PROJECT_RULES.md

## Project Summary

This project is a mobile-first turn-based idle RPG frontend prototype.

The current phase goal is UI/config readiness and shared safety rules. This is not a production launch phase.

## V1A Locked Scope

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

## Forbidden Systems For Early Phases

- Real WLD.
- Real withdrawal.
- Real blockchain.
- Real Paid Gem payment.
- Real ledger.
- Production secrets.
- Production backend APIs.
- Production database logic.
- Production-like mock money paths.

## Required Safety Posture

- WLD-sensitive flags disabled.
- Paid Gem gacha disabled.
- Region default restricted.
- Policy/legal placeholders are not reviewed.
- Simulation status must remain unclaimed unless real simulator output exists.
- Launch status default: NO-GO.
