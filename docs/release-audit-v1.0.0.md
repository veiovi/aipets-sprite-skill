# Initial public release audit

Reviewed 2026-09-25 UTC for AI Pets Sprite Skill for Codex v1.0.0.
Scope: the 32 portable skill files and all 53 files in the compiler archive,
plus this public repository's maintenance files and new Git history.

## Privacy and distribution

- No credentials, private keys, personal filesystem paths, private service
  endpoints, account records, or private production artwork were found.
- Secret scanning used Gitleaks with redaction and archive traversal, plus a
  separate scan of the expanded compiler. Manual inspection covered source,
  documentation, dependency locks, executable setup, and image metadata.
- The compiler archive contains only regular relative-path files. It has no
  nested archives, symlinks, source maps, or bundled character media.
- The compiler archive, dependency lock integrity, 19 runtime file pins, and
  31 source provenance hashes match. Its WASM has no imports or custom/debug
  sections.
- The three illustrations retain standard OpenAI C2PA content provenance.
  Metadata contains generation timestamps, random media identifiers and public
  certificates; no account information, prompts, personal paths or GPS data
  were found.
- One compiler comment names Luna, a publicly shown AI Pets character. It
  contains no character artwork or production data.
- The MIT license and third-party notices are included. The pako Zlib notice
  was added alongside its MIT notice before publication.
- An independent second review reached the same privacy and security conclusion.

## Setup and runtime

Setup verifies the compiler SHA-256 and runs
`npm ci --ignore-scripts --no-audit --no-fund` with pinned public dependencies.
The preview embeds its pack and WASM; its speech-file and microphone inputs
have no upload or telemetry path. Production tools operate on local projects.
The explicit development-runtime override cannot pass final delivery.

The compiler archive SHA-256 is
`51b2b42b16b929c8ee60b355774751b6a47e77152f5591f1bf2bce8bbe4c07e7`.
Its immutable version is `0.3.0-sprite.3`.

This review concerns the released files. It is not a guarantee about future
changes or user-created pet projects. No private repository history is included.
