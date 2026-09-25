# Shared AI Pet animation standard

Both portable skills carry the same versioned standard, `aipet-core-v1`.
Their production methods and runtime representations remain format-specific.

## Required personality moments

| Meaning | Stable moment ID | Acting intent |
| --- | --- | --- |
| Joy | `joyful` | A readable burst of happiness, followed by recovery. |
| Goofy | `goofy` | A funny mistake, surprise or playful gag. |
| Spacing out | `spacing-out` | A dreamy pause or unfocused eyes, then a return to attention. |
| Sweet | `sweet` | An affectionate, bashful or gentle interaction. |
| Character's signature trick | `signature` | A distinctive action using the character's theme, anatomy or props. |

Make all five visibly distinct. Labels and examples do not count as generated,
reviewed motion. Use character-specific acting and a clear neutral return.
A turn or spin is optional; it does not substitute for spacing out.

H3 uses required roles `signature/<moment>`. Sprites place these moments in
the looping idle action's `segments`; set each segment's `moment` to a stable
ID above (an exact matching segment `id` also works). Additional calm segments
provide pauses. Segment IDs and user-facing labels may describe the character.

## Coverage and speaking

Both include idle breathing/blinking, listening, thinking, touch and feedback
for booting, provisioning, connecting, offline and error. H3 retains separate
body clips for all nine core/state roles plus all eight transparent effect
roles. Sprites retain four core motions and may represent operational states
with body animation or effects; up to eight effect roles are supported.

Rich speaking is required in both full workflows. H3 keeps seven mouth stages,
five blink/gaze selections per bank and three speaking body micro-gestures.
Sprites keep the full 14-pose inventory (upright plus 13 named banks), every
mouth stage at every pose, and all seven gesture kinds: left/right/up gaze,
blink, nod, tilt and lean. Automatic gaze/blink and 2–5-second breaks remain the
default. Eight mouth stages is the sprite default. Existing speaking-pose and
moving-speech firmware compatibility requirements still apply.

## Planning and capacity

All sizes below are **decimal bytes per complete .aipetframes file**, including
facial banks, movements, effects and metadata.

| Format | Hard maximum | Core planning target | Additional warning |
| --- | ---: | ---: | --- |
| Sprite | 3,000,000 | 2,400,000–2,550,000 | Report actual remaining bytes. |
| H3 | 12,000,000 | 9,600,000–10,200,000 | Warn whenever a preset exceeds 10,000,000. |

A smaller configured device slot or explicit pack budget always wins. Scale the
80–85% core target to that effective limit. The target is advisory; the maximum
is enforced. H3's >10 MB warning still applies in the upper part of its core
target. Keep compact accepted work even when it lands below the target.

Complete the required core before allocating remaining space to extras. Ask
for or suggest additional character ideas without making suggestions mandatory.
H3 can suggest more elaborate prop play, accessory actions, transformations and
short gags; sprites can suggest economical additional idle segments. Show
measured remaining bytes and label estimates as estimates. In H3, repeat the
>10 MB warning after each build, when discussing more extras, and at delivery
while any selected preset remains over that threshold. A warning does not
require a new approval or relax the 12 MB limit.

Use frame reuse, timing holds and careful sampling to reduce size while
preserving intended behavior. H3 can offer a passing lower-FPS preset. Never
silently remove a required moment, speech bank or requested extra; never enlarge
a hardware slot or weaken visual gates to fit. If the complete requested set
cannot fit, explain the concrete tradeoff before changing it.

The new requirements apply to new full builds. Existing released pets remain
valid as their recorded releases; they are not retroactively certified against
this standard. An old project needs genuine missing artwork and fresh reviews
before its next standard-compliant full build. Renaming a spin does not create
a spacing-out animation.
