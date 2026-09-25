# Full-frame speaking poses

This bundle supports `FP_FEATURE_SPEAKING_POSES` in the canonical compiler and
C/WASM/TypeScript player. There is one scheduler, inside that player. Firmware
without this feature must not be presented as compatible with an expanded pack.

## Inventory

Keep the default bank in `speaking.sheet/cells`: cells select open stages only;
the exact neutral is prepended. Each additional bank includes its own closed-mouth
frame and every other mouth stage in the same order. Preserve the stage count of
an existing pet (typically seven or eight); do not reduce it during migration.

The required inventory adds 13 banks: `nod-half`, `nod`, `tilt-half`, `tilt`,
`lean-half`, `lean`, `left-half`, `left`, `right-half`, `right`, `up`,
`blink-half`, `blink`. Neutral plus these is 98 frames at seven stages or 112 at
eight. Head motion is subtle: about 3° for an intermediate, 6° at the peak; lean
can change perspective by about 1.5% and 3%. These are prompt targets, not bitmap
transforms. Eyes move within their original shapes. Both eyes close together.

This excerpt illustrates one bank and gesture; a full configuration must include
all required banks and gesture kinds.

```json
{"speaking": {
  "sheet": "speech", "cells": [1,2,3,4,5,6],
  "poses": [{"id":"up","sheet":"speech-up","cells":[0,1,2,3,4,5,6]}],
  "gestures": [{"id":"up","kind":"look-up","automatic":true,
    "path":[{"pose":"upright","durationMs":132},
            {"pose":"up","durationMs":594},
            {"pose":"upright","durationMs":264}]}],
  "breakMs":{"minMs":2000,"maxMs":5000}
}}
```

`upright` is the canonical compiler's name for pose zero, not an extra sheet.
For the complete 13-bank inventory, omit `gestures` to use the seven built-in
paths. Automatic left/right use intermediate → peak → intermediate, up returns
directly, and blink uses half/closed/half at 66/99/66ms. Nod/tilt/lean remain
authored nonautomatic gestures. The runtime currently selects automatic gestures;
do not promise a manual gesture selector that it does not expose. Inspect all
authored banks as contact sheets even when they are nonautomatic.

Custom paths may add variation but must preserve all 14 poses and seven gesture
kinds. Each must start and end at `upright`, and visit its corresponding peak.
Left/right/up/blink must remain automatic. The neutral bank's row must equal the default speech
table byte-for-byte; all rows must have the same stage count. Compiler validation
checks these conditions. Pauses quantize to the 33ms player tick.
The skill rejects compact or partial speaking banks in new full builds.

## Migrating older packs

Archive the prior package. Review reusable gaze/blink cells for framing, both
eyes, mouth order and palette quality; reuse their hashes where compatible.
Move them into `speaking.poses`, generate missing intermediate/other banks, and
remove `speaking.variants`. The old metadata-only `speakingOptions` scheduler is
retired; the new workflow rejects it rather than silently dropping those frames.
Do not leave a host timer switching clips alongside the canonical director.

Review every compiled opening in every bank, neutral entry/return, silence,
interruptions, reduced motion and all drift extremes. `runtime-checks.json`
contains 14,400 deterministic C/WASM–TypeScript parity ticks. Use the full preview
with a local speech recording or microphone as well. Automated parity does not
prove visual quality. Drift is a runtime option, not extra artwork; the hosting
website must separately expose and persist its setting.
