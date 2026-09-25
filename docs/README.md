# Maintainer documentation

The [README](../README.md) introduces the skill and installation.
The [skill instructions](../SKILL.md) define the production and review gates;
[workflow.md](../references/workflow.md) documents project files and commands.
The [initial publication audit](release-audit-v1.0.0.md) records the release scope.

## Local verification

With Node.js 22+ and npm:

```sh
node scripts/setup.mjs
node --test scripts/*.test.mjs
```

Setup downloads only integrity-pinned public npm dependencies and disables
dependency lifecycle scripts. No API key or pet generation is needed for these
checks. Keep the generated `scripts/runtime/` directory out of Git and releases.

## Release contents

The installable ZIP has a single top-level `sprite-aipets/` directory containing
`SKILL.md`, `README.md`, `LICENSE`, `THIRD_PARTY_NOTICES.md`,
`compiler-provenance.json`, and the `agents/`, `assets/`, `references/`,
and `scripts/` trees. Exclude `scripts/runtime/`, `node_modules/`, caches,
hidden files, local pet output, and credentials.

Keep the GitHub release tag bound to the reviewed public commit. Include a
per-file SHA-256 manifest and archive checksum with each release. Confirm that
README image paths and download links work without authentication.

Inspect both the visible files and everything inside `scripts/compiler.tgz`.
Preserve image content-provenance metadata and all dependency notices.
The compiler's version is independent of the skill's release version.
