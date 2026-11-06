---
title: Contributing
description: How to contribute to PATIENCE.
---

We welcome contributions from chronologists, veterinarians, Monty Python historians, and remorseful AI researchers.

1. **Fork the [repository](https://github.com/infrashift/patience)** (and star it so our investors think this was a B2B SaaS pivot).
2. **Create a feature branch:**
   ```bash
   git checkout -b feat/more-intense-ocular-plasma
   ```
3. **Run it locally** with `make dev`, and run `make test` before you push. See [Local development](/patience/guides/development/).
4. **Follow the strict contribution guidelines:**
   - **Preserve the Single-File Mandate.** The clock must remain one self-contained file: `public/clock/index.html`. The website around it may use a `package.json`. The clock may not. Every bundler imported into the clock removes a kitten's whiskers.
   - **Acoustic fidelity.** Changes to `playCatVocalization()` must be tested within earshot of a real domestic housecat. If your cat doesn't immediately look up in alarm, your formant filter Q-values are too weak.
   - **Ecological parity.** Keep PR descriptions concise so we don't burn down another 1⁄100th of the Amazon running CI/CD code review bots.
5. **Submit a pull request.**
