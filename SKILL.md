---
name: sprite-aipets
description: Create and refine AI Pet characters with built-in ImageGen, generate full-frame sprite animations and speaking poses, review the canonical player, and compile portable .aipetframes packages. Use for sprite-only pet creation, animation upgrades and package repair.
---

# AI Pets Sprite Skill for Codex

Create a portable 240×240 AI Pet with built-in ImageGen. Refine the look in chat;
after appearance approval and authorization to finish, complete sprite production,
review and packaging autonomously. Keep the approved face unless the user requests
a redesign. No H3, Muse, external generation account or private checkout is needed.

## Start and resume

Read [workflow.md](references/workflow.md) for configuration, receipts and commands.
Run `node <skill>/scripts/setup.mjs` to install the hash-pinned compiler with
Node.js 22+ and npm. Image generation requires the built-in ImageGen tool; explain
if unavailable instead of substituting another provider or drawing art in code.
The public bundle is MIT licensed; retain LICENSE and THIRD_PARTY_NOTICES.

Create a user-owned project directory. Record start time, source hashes, prompts,
all attempts and selections in `generation.json`. Keep a resumable checklist.
On resumption, verify existing source and review hashes before repeating work.
Only create a Goal when the user explicitly requests a Goal.

Before a first concept, ask for a background preference if none is given; explicit
authorization to choose autonomously permits your own contrasting solid color.
Save its exact `matte` RGB. Show one neutral concept at device size, eyes open and
mouth closed. Refine in chat and bind the chosen source hash to user approval.
An autonomous demo may choose its own look only when authorized; record that
distinction. Existing approved pets do not need another concept gate.

## Composition and acting

Target roughly 60–65% of the neutral canvas on the character's longest dimension,
with room for poses and effects. Aim for 8–12px clearance inside the circle at
movement extremes, including all four ±2px drift offsets. Record actual clearance;
a tighter intentional effect needs explicit visual review. No clipping. Use the
same camera, framing and background across a family. Never shrink, rotate or fit
individual silhouettes to hide a bad generation.

Use [prompts.md](references/prompts.md), then generate complete sprite sheets from
the locked source/scaffold. Measure actual grids; square cells and common crops
are required even with odd generated dimensions. Review raw cells, normalized
cells and compiled pixels. Translation registration uses stable textured anchors
only; disable it for intentional motion.

For spectacles or animation replacements, read
[expressive-animation.md](references/expressive-animation.md). Give each action
anticipation, a readable peak, recovery and the exact neutral return. Choose
acting that fits the character: binary daydreams, VR immersion, joyful explosions
or dissolving into code are examples, not required identities.

## Inventory and speaking

Follow the [shared animation standard](references/animation-standard.md).
Require idle/listening/thinking/touch and five distinct personality moments:
joy, goofy, spacing out, sweet and the character's signature trick. Use eight
amplitude mouth stages by default. Compile the five named moments and calm
blink/breathing pauses into one canonical idle timeline. A turn is optional.
Preserve requested inventory; never silently remove animations or mouth detail.

Speaking uses opaque complete frames. Stage zero is the exact neutral; remaining
mouth openings must be distinct and ordered. A reviewed offline mouth repair can
copy generated pixels into a narrow region, producing complete frames; do not
invent a synthetic mouth ladder.

Rich speaking is required: read [speaking-poses.md](references/speaking-poses.md). Use
canonical `talk.poses`, `talk.gestures` and `talk.breakMs`, with all mouth stages
at every pose. The full inventory is 14 poses including neutral, seven gestures,
auto left/right/up/blink, randomized 2–5-second breaks and 66/99/66ms blink phases.
Keep both eyes blinking together and gaze inside established eye silhouettes.
Mouth and pose timing are independent. Retire the old alternative-bank scheduler;
never add a JavaScript scheduler over the canonical director.

Drift needs no images. The preview uses optional ±2px canonical speaking drift;
a website toggle, persistent setting or broader state support belongs to the
application/firmware integration. Do not claim it is deployed by this skill.

Operational feedback for booting/provisioning/connecting/offline/error can use
transparent effects. Use at most eight roles. Each effect needs at least three
distinct selected drawings (four by default), genuine binary alpha, zero hidden
RGB and no overlap with reviewed face guards. Inspect actual composites on dark,
light, checkerboard and moving-pet backgrounds. Regenerate or reposition the whole
effect rather than erasing a bad overlap. Full-frame performances can bake glows
and transformations into opaque art when requested.

## Production and review

Use `workflow.mjs scaffold PROJECT 4 2`, then `prepare`, `build` and `deliver`.
The workflow reference documents inputs and receipts. Preserve rejected attempts;
use up to three attempts per failed family, then ask for the specific unresolved
art decision. Do not regenerate accepted artwork for cosmetic perfection.

Show generated art in chat, speech strips, motion contacts and effect composites.
Give concise stage updates. Record each attempt's wall-clock start/end; token/cost
values require real telemetry with scope stated. Use null when unavailable.
A saved image is not a displayed image.

A source review accounts for every raw/normalized cell, including omissions.
Build the approved source version, inspect its exact bytes, and bind the compiled
review to that hash. `deliver` rejects stale evidence and failed gates. Technical
tests never supply visual approval. Inspect every selected frame, mouth opening,
both eyes, neutral transitions, crop clearance and preserved animations. If
browser restrictions prevent interaction, state this and supply exact C/WASM
framebuffer evidence; never substitute a prototype or claim unperformed checks.

Build double-compiles for determinism, runs a 1,152-tick canonical state trace plus
14,400 speaking/profile/drift parity ticks, and emits a full tour. Review long or
custom clips beyond the finite traces. Exercise speech levels, silence, touch,
state changes, reduced motion and drift on/off. The preview accepts local speech
files or microphone without uploading audio. Inspect individual pose contacts too.

## Release

The hard cap is 3,000,000 decimal bytes per complete pack, or a smaller configured
device slot or explicit pack budget. Build and delivery both enforce it. Verify
actual target capacity separately; a 3 MB authoring cap does not enlarge hardware.
Aim to finish the required core at 80–85% of the effective limit (2.4–2.55 MB at
the full ceiling). Offer extra ideas using measured remaining bytes. Never weaken
fidelity gates, reduce required speaking poses or silently remove animation to
hide an overrun.

Version replacements and preserve rollback. Deliver the `.aipetframes`, editable
project/sources/prompts/rejections, receipts, compiler provenance, measured bytes,
exact preview and installation checklist. This is an asset pack, not firmware;
never flash at address zero. Hardware installation, NVS, website configuration
and cloud identity/catalog publication stay with their owning workflows. Public
skill publication is separate from private character art.
