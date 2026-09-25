# Prompt recipes

Use built-in ImageGen. For local references, inspect with `view_image` first,
then pass `referenced_image_paths`. Preserve each exact prompt and output path.
Copy project images from the tool's returned path; never guess its filenames.

Resolve the background preference before the first concept. If unspecified,
ask: "What background colour would you like—dark, light/pastel, or a custom
colour?" Suggest a contrasting option for the proposed pet. Accept named colours
or hex values; resolve the choice to one exact RGB/hex colour and keep it in
every opaque prompt. When the user delegates the choice, record your selection.
The reserved empty margin uses this colour, not necessarily white.

## Neutral

One square front-facing portrait of [user concept], clear silhouette and readable
mouth. Eyes open, mouth closed, relaxed neutral expression. Entire character
including every accessory, fits within about 60–65% of the canvas on its longest
dimension, centred with generous visible background around it. Leave extra
headroom for bouncing and a clear side/upper pocket for effects; keep the full
silhouette comfortably inside the circular display. [Chosen style].
Uniform opaque background [chosen exact hex/RGB]. No text, labels, border or ground
shadow. One character, not a sheet.

Do not impose a particular art style if the user specified one. Fine detail
costs storage and may disappear at 240px; explain visible tradeoffs in chat.

## Speech

Edit the supplied tiled neutral scaffold into exactly eight equal SQUARE cells,
four columns by two rows, edge-to-edge with no gutters, labels or borders.
Preserve within-cell position/scale, identity and background. Each cell is a
complete opaque character with the same generous empty margins and chosen solid
background [exact hex/RGB]. In row-major order: closed mouth, tiny opening,
small, medium-small, medium, medium-large, large, maximum natural speech opening.
This is a volume ladder, not phonemes or a loop. Do not return to closed.
Only the mouth changes. Keep eyes open; fix face, body and accessories for
readability. Mouth stays in its anatomical location, clear of other features.
Fully OPAQUE background, no transparency or fake checkerboard.

## Motion

Exactly twelve equal square cells, four columns by three rows, no gutters.
The tiled reference sets the camera/framing for every cell. [One small action,
or explicitly described four-frame actions per row]. Allow natural secondary
motion of [character-specific hair/leaves/ears/clothes]. Preserve identity and
scale and reserved background margins from the reference; do not enlarge the
character to fill each cell. Keep [feet/base or another genuinely stationary feature] planted.
Start close to the locked neutral. For ping-pong, progress smoothly from rest
toward the motion peak; playback will reverse to return. Keep every accessory
inside the circular safe area with visible clearance at the motion peak; the
action may use the neutral's reserved space. Uniform fully opaque background
[chosen exact hex/RGB], matching the approved neutral.

Write the actual action rather than a blanket "nothing moves" constraint.
Use real eyelid closure for blinking; avoid flattened/squashed eyes. A one-shot
touch reaction should settle visibly and return to the neutral hub.

## Effects

Effect-only sheet, [grid]. TRUE TRANSPARENT alpha background. No pet or face.
Small clean flat opaque shapes, no translucent glow, gradient or shadow.
[Specify each symbol or successive phase in row-major order.] Place the effect
inside [safe region normalized to each cell], keep [face guard] empty. No labels,
text or painted checkerboard. Keep sizes/positions consistent across phases.

Every effect needs an actual phase sheet. Use four columns for four successive
phases and one role per row, up to four rows per sheet. Boot sparkle grows and
twists; loading ring rotates; connection arcs appear sequentially; offline symbol
sways; error marker wobbles; listening bars change height; thinking dots bounce;
touch heart pulses and rises. No static-role fallback. After common placement,
check all phases remain distinct and readable at final size and clear the most
extreme idle pose. Move the shared effect canvas to a clear margin if needed.
Choose symbol fills/outlines that remain legible against the user's selected
background, and inspect the actual composited result on that colour.

## Joyful and goofy idle variants

Use a 4×2 neutral scaffold. Top row: neutral, pleased squash, small joyful bounce,
happy stretch with arms lifted and accessories following. Bottom row: neutral,
curious lean, playful wink, goofy closed grin and small wave. Four progressive
poses per row; play forward then backward. Keep complete anatomy and framing,
allow natural secondary motion, and keep all extremes inside the circle.
Adapt the actions to the pet rather than forcing leaves, arms or human anatomy.

## Spacing-out idle

Use a 4×2 scaffold: attentive neutral, attention drifts, slightly unfocused eyes,
dreamy pause, slow soft blink, a tiny surprised realization, attention returns,
exact neutral. Keep pupils inside the established eye shapes; no detached eyes,
distorted sockets or accidental held wink. Tailor a small accessory reaction to
the character. Hold the dreamy peak briefly and return clearly to attention.

## Signature trick

Give the character one recognizable trick using its theme, anatomy or prop:
anticipation, reveal, surprising payoff, recovery and exact neutral. Describe
the specific action in the prompt. Keep it distinct from joy and goofy acting,
and contain every prop/effect within the reserved circular margins.

## Optional spin

Use a 4×2 scaffold for eight views at 45-degree increments: front, right
three-quarter, right profile, rear three-quarter, full back, opposite rear
three-quarter, left profile, front three-quarter. Complete a turn around the
body's vertical axis; never rotate a flat image or substitute a head waggle.
Hide front-only facial features and belly markings on the back. Keep body volume,
camera scale and baseline consistent while feet step and accessories follow.
Play the eight angles once and append the first frame to settle facing forward.
Do not apply front-view facial anchor registration to side/back frames.

## Sweet/flirty idle

Use a 4×2 scaffold for one eight-frame sequence: neutral, gentle pleased head
tilt, bashful cheek gesture/blush, playful wink, shy closed-lid smile, warm gaze
with opposite tilt, upright soft smile, neutral. Express friendly character
charm through acting. Keep anatomy, identity and complete framing consistent;
adapt the gesture to the character. Extra drawn hearts are unnecessary because
state/touch overlays have their own animation. Play the sequence once, with
calm holds at entry and exit.
