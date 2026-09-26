# AI Pets Sprite Skill for Codex

This repository distributes the portable `sprite-aipets` Codex skill.
Read [SKILL.md](SKILL.md) and [docs/README.md](docs/README.md) before changing it.

## Build less

Leave this codebase simpler than you found it.

- **Do exactly what was asked.** Nothing adjacent, nothing "while I'm here",
  and no preparing for requirements nobody has stated.
- **Prefer editing to adding.** Reuse the existing module, script, component
  or doc before creating a new one. Deleting dead code, flags and docs you
  touched is welcome.
- **Adding any of these needs a one-sentence reason in the PR:**
  - a package, dependency or service;
  - a config option or feature flag;
  - a format or protocol version;
  - a doc file.

  If the reason is "future-proofing", "flexibility" or "just in case", don't
  add it.
- **One implementation per concern, and one safeguard per risk.** Don't add
  fallbacks, retries or validation for states that cannot happen, and delete a
  switch once its feature is live.
- **Find the real cause first.** Don't add an option, retry or workaround for a
  problem you haven't diagnosed.
- **Tripwire.** A change over ~400 hand-written lines, or touching more than
  ~10 files, is probably doing too much. Split it, or say why it can't be
  smaller.
- **Readable code.** Normal formatting, short functions, and no minified
  one-line code. Don't reformat code you didn't change.
- **Before the PR,** reread your diff and cut what the task didn't need.

## Test what you changed, not everything

Unit tests matter. Write them for behavior, keep them few and sharp, and run
only what the change affects.

- **Write** one regression test per bug fix, which fails before the fix, and
  tests of the public behavior of new code: the main case and the failure that
  matters. Extend an existing test file before creating one.
- **Don't write tests that break on harmless changes:**
  - reading source files as text or matching code strings;
  - exact wording, CSS values or call counts, unless that is the requirement;
  - snapshots of large objects;
  - private helpers;
  - mostly mocking this project's own modules.
- **Run:** `node --test scripts/*.test.mjs` takes seconds, so run it for any
  script change. A change can be tested without generating artwork or calling
  paid services.
- **When a test fails,** read the failure, fix the cause, and rerun that file.
  Fix or delete a flaky test; don't add retries.
- **Docs-only changes:** check the diff and the links, nothing else.

## Repository rules

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
