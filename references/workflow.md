# Local project and commands

Invoke scripts by absolute path. The project stays independent of the skill.
`setup.mjs` installs a bundled hash-pinned compiler plus integrity-locked npm
dependencies, with lifecycle scripts disabled. It never calls an image API.

```sh
node /path/to/sprite-aipets/scripts/setup.mjs
node /path/to/sprite-aipets/scripts/workflow.mjs scaffold /path/to/pet 4 2
node /path/to/sprite-aipets/scripts/workflow.mjs prepare /path/to/pet
node /path/to/sprite-aipets/scripts/workflow.mjs build /path/to/pet
node /path/to/sprite-aipets/scripts/workflow.mjs deliver /path/to/pet
```

## Production goals and resuming

Once the look is locked and production is authorized, keep
`production-status.md` in the pet project. Record the approved source hash,
background, scope, artifact/review paths and hashes, attempts used per family,
completed checks and the next concrete action. Update it after each stage and
before yielding on a required user decision. This is an agent-maintained
checkpoint, not a CLI-generated report or evidence that an unchecked step passed.

Use a checklist for full rich speech; calm pauses and required joyful/goofy/
spacing-out/sweet/signature idle segments;
listening/thinking/touch; all eight animated overlays; stabilization and source
review; deterministic compilation and exact-player review; then delivery of the
pack, sources, preview, receipt and timing/available-usage logs. Respect any
user-requested inventory changes.

When the user explicitly requests a Goal and the host exposes Goal tools:

- Inspect the current Goal first. Reuse a matching active Goal; do not replace
  an unrelated unfinished Goal. Explain that conflict and continue authorized
  work with the checklist unless the user redirects the existing Goal.
- Create the Goal after look approval, with the project path and an objective
  such as: “Finish this approved sprite AI Pet using built-in ImageGen: generate
  and review speech, five idle variants, the remaining core motions and eight
  animated overlays; deliver a validated .aipetframes pack within the agreed
  size budget, editable sources, exact-player preview, hash-bound reviews and
  honest timing/usage logs. Follow production-status.md. No publishing or
  physical-device writes.” Set a token budget only if explicitly requested.
- Mark it complete only after the required reviews pass, final bytes and size
  are verified, and the deliverables are ready and linked in chat. Follow the
  host's rules for pause, blocked status and budget limits. A retry cap or user
  decision is not permission to mark incomplete work complete.

Goals can support continuation across turns in compatible Codex hosts; they do
not guarantee unlimited execution or supply missing tools. If unavailable,
say so briefly and continue the authorized workflow with the checklist. Never
add a recurring automation as a substitute. The existing three-attempt limit
per failed family and required art decisions still apply.

On resumption, read the checkpoint and generation/review records, verify the
referenced files and hashes, and continue from the first incomplete stage.
Reuse valid generations instead of spending again. Invalidate affected reviews
when sources or configuration change. A Goal belongs to its task: in a new
conversation, resume from the project checkpoint and create a new Goal only
when explicitly requested.

## Project configuration

`sprite-project.json` fields:

- `id`: lowercase hyphenated slug; `name`; `version`: semver.
- `neutral`: relative PNG path; `matte`: RGB triplet for the user's chosen solid
  background. Resolve the preference before concept generation and record its
  hex/RGB value in generation notes. Opaque prompts use this exact colour.
  `matte` fills uncovered pixels; it does not recolour an existing opaque image.
  A later background change needs revised artwork and a fresh review.
- `lookApproval`: `{mode: "human" | "autonomous-demo", sourceSha256, note}`.
  Hash the original neutral file, not the normalized preview. A demo note must
  cite the user's authorization to choose the demonstration appearance.
- `maxBytes`: optional explicit pack budget; `slotCapacityBytes`: target asset
  capacity. Both default to 3,000,000. Build and delivery enforce the smallest
  of these values and the hard 3,000,000 byte cap, even if configured higher.
  The 80–85% core target is advisory, not an extra hard gate.
- `sheets`: `{id, file, reference?, recipe}`. `reference: "neutral"` matches
  anchors to the locked image; otherwise matches the first sheet frame.
- `recipe`: `{columns, rows, kind: "opaque" | "effect", cells?, anchors?,
  radius?, maxError?, manual?}`. Rectangles use `{x,y,width,height}`.
  `cells` are measured **source image** coordinates. Other coordinates and
  manual offsets are in final 240px space. Equal square cells only; for odd
  generated dimensions declare common-size crops and inspect the omitted
  one-pixel seams. Never hide visible content with guessed crops.
- `anchors`: zero to four textured stationary rectangles; default empty means
  stabilization off. Translation radius defaults to 4px (maximum 8px).
  Matches must agree within 1px and meet `maxError` (mean RGB error, default 20).
  Rejected matches apply zero automatic translation and emit a review warning.
- `manual`: source-cell-index keys to `{x,y}` corrections (±24px). Corrections
  follow source indices even if playback order changes. Cropped foreground is
  rejected. Do not use a manual offset to cancel intentional action motion.
- `effectPlacement`: optional `{scale,x,y}` inside the recipe. Applies one common
  scale (0.1–1) and position to the complete effect canvas across every cell.
  Use it to place an oversized generated effect sheet in the safe margin;
  it cannot resize character frames or fit individual effect silhouettes.
- `speaking`: `{sheet,cells,thresholds?,repairRegion?,poses?,gestures?,breakMs?}`. `cells` selects only the
  open stages; exact neutral is prepended automatically. Eight total stages is
  the default creative target; the runtime accepts 2–16. `thresholds` includes
  zero. `repairRegion` is an optional reviewed offline mouth rectangle.
  All 14 pose banks and seven gestures are required. See
  [speaking poses](speaking-poses.md) for full-frame banks and migration.
- `motions`: `{id,role,sheet,cells,mode,durationMs?,durations?,neutralEnds?}`.
  Roles: `foundation/idle-breathing`, `states/listening`, `states/thinking`,
  `physical/touch-tap`, plus `states/<operational-state>` if using acting there.
  Modes: `loop`, `ping-pong`, `once`, `hold-last`. Touch must use `once`.
  `neutralEnds` adds a 99ms neutral entry and 165ms neutral exit to a one-shot.
  Continuous actions must have no separate phases. Durations quantize to 33ms.
- Idle may replace its top-level `sheet/cells/durations` with `segments`, each
  `{id,label,moment?,sheet,cells,mode,durationMs?,durations?}`. The parent must be
  `foundation/idle-breathing` with `mode:"loop"`. Segments play in order within
  that one canonical action; a segment's ping-pong return is expanded once.
  Include joyful, goofy, spacing-out, sweet and signature moments, with calm
  pauses. Set `moment` to the stable ID in
  [the shared standard](animation-standard.md); an exact matching segment
  `id` also works. Add other optional segments within the budget. The combined expanded timeline
  must fit the compiler's 256-step limit (including expanded returns). Preview choices seek into the exact
  compiled idle timeline, without a second animation implementation.
- `effects`: `{id,role,plane,sheet,cells,durationMs?,durations?,loop}`.
  Operational roles, listening, thinking and speaking use `stateFx`;
  touch uses `touchFx` and `loop:false`. Maximum eight roles.
  Every effect requires at least three distinct normalized sprites; four phases
  is the default. Static or duplicate-only sequences fail the build.
- `protectedRegions`: facial guard rectangles shared by all effects.

At concept review, target 60–65% canvas occupancy along the neutral pet's longest
dimension, including accessories. At 240px this leaves roughly 42–48px per side
along that centred dimension. Inspect the real silhouette against the circle,
reserve an effect pocket, and verify readable features at device size. Motion
can consume the empty background margin, while extreme poses should retain
8–12px circular-edge clearance. These are visual framing targets, not automatic
silhouette-detection or padding enforcement in the CLI. Record observations in
`circularCrop` and `effectComposites`; do not claim an automated clearance pass.

`prepare` saves immutable-input hashes, raw/corrected contact sheets and every
normalized frame. If recipes or source files change, prepare and review again.
Outputs are deterministic for a given recipe. Original images stay untouched.

## Source review

Build a candidate first if useful. Inspect `prepared/speech-contact.png` after
build, including any offline repair, plus every raw/corrected sheet. Write:

```json
{
  "selectionHash": "the full hash from prepared/report.json",
  "mode": "autonomous",
  "verdict": "pass",
  "sheets": [{"id":"idle","inspectedFrames":[0,1,2,3],"verdict":"pass","notes":"Describe identity, motion, selected and omitted cells, anchor warnings and the loop seam."}],
  "checks": {
    "identity":"comparison observations",
    "speechOrder":"observations for all selected stages and repaired strip",
    "naturalMotion":"what moves and what remains stable",
    "loopSeams":"seam/reversal and neutral-boundary observations",
    "circularCrop":"extreme frame observations",
    "effectComposites":"all effects over light/dark/checkerboard and moving pet"
  }
}
```

Include one entry per sheet and all its cell indices. This receipt records the
agent's inspection; it is not an automatic computer-vision quality score.
Reject or regenerate ambiguous art. A passing technical build cannot make a
failed visual decision pass.

## Exact compiled review

The preview starts with **Play all animations** enabled. Its scenes cover the
complete idle mix plus individual named idle variants, listening, thinking,
touch, speaking with silence, touch while
speaking, and five operational states. Durations cover each core clip's full
authored cycle, including ping-pong return. Selecting an animation stops the
tour; Replay restarts it, and the speech envelope is enabled by default.
Playback logs show scene transitions and touch events separately from run cost.
**Ping-pong all** plays each scene forward through C/WASM, then replays its
captured framebuffer samples in reverse before advancing. This is a preview
mode; it does not reverse system events or alter the device pack. Only the
current scene is cached (at most about 513 RGB565 frames); long scenes sample
more sparsely to bound memory. Pause, Step, Replay and manual selection work in
both directions. Pack-level idle ping-pong is independently compiled as steps.

Before building, save `run-summary.json` with this shape:

```json
{
  "scope":"This pet run, from concept request to reviewed sources",
  "startedAt":"ISO UTC timestamp", "finishedAt":"ISO UTC timestamp",
  "elapsedMs":null,
  "tokens":{"total":null,"input":null,"cachedInput":null,"output":null,"source":"Unavailable in this session"},
  "imageTokens":null,
  "stages":[{"stage":"concept attempt 1","durationMs":null,"status":"selected","note":"Duration unavailable"}],
  "note":"Explain any exclusions, estimates or shared-session measurements."
}
```

Replace nulls only with observed measurements. Use counter deltas at the same
scope boundaries where possible. Whole-session usage may include repeated cached
context and skill development; label that rather than presenting it as typical
per-pet usage. Never copy raw session logs into a distributable project. ImageGen
usage can be unavailable even when chat token usage is known. Tool turnaround
includes tool overhead; if a yielded image job was collected later, that elapsed
time is an upper bound, not exact generation latency.

CLI commands append measured durations and pass/fail outcomes to
`run-events.jsonl`. The build embeds a snapshot of the summary and prior events,
plus build time through preview creation, in hash-bound `review-data.json` and
the preview. The completed command duration stays in `run-events.jsonl`.
Rebuild to refresh the embedded log; pack bytes do not depend on log metadata.

`build/preview.html` is self-contained: embedded pack and real C/WASM player,
no server or network calls. Open it in the in-app browser when supported; it
also opens in an ordinary local browser. Review all states and Full/Balanced/
Reduced, speech envelope, silence, touch in and out of speech, and circle/square
views. `trace-*.png` exposes all 384 frames of the compiler's standard trace.
The 1,152-tick state trace is supplemented by 14,400 speaking/profile/drift parity ticks in `runtime-checks.json`. Inspect custom long loops beyond these finite traces too. The preview accepts microphone or local speech files and has a drift switch. A public website setting is a separate dependency.

The current runtime prioritizes operational character acting over equal-priority
touch acting. The full-body touch reaction is visible in idle; during listening,
thinking and speaking, the touch overlay provides feedback while ongoing acting
or speech continues. Review this behavior rather than promising every touch
interrupts every state. Keep overlays clear of the most extreme selected pose.

After reviewing the source-approved build, write `compiled-review.json`:

```json
{
  "packSha256":"the exact build/build.json hash",
  "mode":"autonomous",
  "verdict":"pass",
  "checks": {
    "allStates":"observations", "speechSilence":"observations",
    "touchDuringSpeech":"observations", "profiles":"observations",
    "loopSeams":"observations", "circularCrop":"observations",
    "effects":"observations",
    "technicalWarnings":"Disposition of each compiler warning category, when present"
  }
}
```

Deliver includes an asset pack with internal source approval, not a signed
website installation envelope. Keep the physical-device claim separate from
host playback. Preserve the whole project for later revisions and pack handoff.
Failed compiler gates prohibit delivery. Warnings require an explicit visual
disposition; intended ping-pong/neutral reuse is different from duplicate speech.

For locked native 240px artwork, 85–95% background coverage is a review warning:
a small full-body pet can need this much movement space. Inspect the complete
silhouette against the source and record why the mask is intact. Do not resize
individual frames to satisfy a portrait occupancy assumption. Coverage beyond
95%, an almost absent background, and legacy portrait limits remain hard gates.
