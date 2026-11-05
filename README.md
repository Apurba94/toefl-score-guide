# TOEFL Score Guide

Understand the 1 to 6 band scale and its CEFR levels, and record the scores your target universities ask for.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the TOEFL iBT and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `TOEFL Score Guide.exe` from the [latest release](https://github.com/Apurba94/toefl-score-guide/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/toefl-score-guide/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Since January 2026 the TOEFL iBT reports each skill and the overall score on a 1 to 6 scale in half bands, aligned with the CEFR levels A1 to C2. For a transition period, score reports also show a comparable score on the older 0 to 120 scale. This guide explains the bands and keeps a list of the scores your universities require, with a check against your latest scores.

Sections: Bands, My targets, Progress, About.

## How to use it

1. Read **Bands** to see what each level means.
2. Add each program's minimum scores in **My targets**, from the program's own website.
3. Use ETS's official tables to compare 1 to 6 and 0 to 120 scores; this app does not guess a conversion.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
