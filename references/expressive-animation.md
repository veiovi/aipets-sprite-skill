# Expressive full-frame animation and replacements

Inspect current contact sheets and playback first. Identify the idle/motion slots
to replace; record before/after roles and frame hashes. Keep the core face,
speaking inventory and unrelated animations. Create a new project version and
retain the old release as rollback. Approval to finish an existing design does
not require another concept round or per-sheet approval.

## Make the action readable

Generate 6–8 distinct drawings with anticipation, a clear action, peak hold and
recovery. Anchor entry and exit to the exact approved neutral. Hold a spectacular
peak longer than its transition. Full-frame glows, code fields or transformations
belong in the drawing when requested, with no runtime overlay dependency. A
disappearance should include genuinely character-free cells before reassembly.
Keep a calmer interval between performances so their contrast remains visible.

For a reversible motion, author the outbound action and use ping-pong timing;
do not double-expand it. A blink requires two matching eyes and brief closed-eye
timing, not a held wink. A spin needs generated side/rear views rather than a
rotation of the front bitmap. Fast mouth motion belongs in amplitude banks;
slower acting belongs in the pose director or nonspeaking performances.

Use `motions[].segments` for named moments in a looping idle action. A segment
can use `sheet:"neutral",cells:[0]` to insert a deliberate calm hold. For exact
neutral endpoints around a generated segment, author neutral segments before
and after it. Expanded action steps, including returns, must fit 256 steps.
Do not add a second scheduler merely to select these authored drawings.

## Framing and palette

Scaffold generous empty space around the pet and every effect. Inspect all cell
edges: a cloud or flare crossing a sheet boundary is a failed generation, not a
crop opportunity. Keep a shared palette across banks, especially saturated glow
colors. If indexed-palette fidelity fails, simplify the generated color family
and regenerate within the attempt limit; do not lower the gate threshold.

Generated matte texture can waste substantial bytes. A separately reviewed,
border-connected cleanup may flatten only near-matte background pixels to the
approved solid RGB. Use a recorded conservative color-distance threshold and
retain original normalized and cleaned hashes. Never flatten disconnected
interior features or conceal foreground loss. This cleanup is optional and is
not silently applied by `prepare`.

## Review and delivery

Inspect every raw attempt, normalized frame and exact compiled frame. Review the
complete new timelines, transitions, all preserved roles and all four ±2px drift
corners. Measure actual complete pack bytes against both approved authoring budget
and separately verified target capacity. Recompile twice. Budget approval alone
can reuse earlier visual/runtime evidence only when the pack bytes and player
hash remain identical; record that fact rather than claiming a fresh run.

Publish a matching full animation tour and hash-bound receipts. Keep failed
attempts, selection rationale and compiler provenance. Device installation and
cloud/public publication are separate actions.
