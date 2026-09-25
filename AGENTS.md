# AI Pets Sprite Skill for Codex

This repository distributes the portable `sprite-aipets` Codex skill.
Read [SKILL.md](SKILL.md) and [docs/README.md](docs/README.md) before changing it.

- Keep the invocation and installed directory named `sprite-aipets`.
- Requirements: Node.js 22+, npm, and built-in ImageGen for new artwork.
- Setup: `node scripts/setup.mjs`. It creates the ignored `scripts/runtime/`.
- Focused checks: `node --test scripts/*.test.mjs`.
- Preserve the immutable compiler archive, matching pins, source provenance,
  MIT license and dependency notices. Compiler upgrades require a reviewed
  export; do not patch the bundled binary or weaken hash checks.
- The skill creates local animation assets. Firmware flashing, account
  enrollment, cloud publication and paid generation services are outside scope.
- Never commit credentials, personal paths, generated pet projects, installed
  dependencies, runtime caches, or private production artwork.
- Use feature branches and pull requests. Review release files and archive
  contents before publishing. Keep the README and installation links accurate.
