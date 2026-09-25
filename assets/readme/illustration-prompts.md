# README illustration prompts

These are documentation assets for **AI Pets Sprite Skill for Codex**. The mint sprout creature is an original explanatory mascot, not an approved production character or a runtime capture. The six-step graphic compresses a process that includes iteration; it does not promise first-pass generation success.

Generated on 2026-09-25 with the built-in ImageGen tool. No external generation API or fal job was used. Costs and model identifiers are not asserted because the tool did not provide that telemetry. The selected PNGs retain the tool output without raster editing. The files are included with the skill under its repository license.

## Selected files

| File | Dimensions | SHA-256 |
| --- | --- | --- |
| [hero.png](hero.png) | 1536 × 1024 | `c17971fd72da50b457271d41af1cf840dcb87554c30df8a347749435689b7203` |
| [workflow.png](workflow.png) | 1536 × 1024 | `d36354a274998cac906daba41553aee8bd31b3149c549255446b9d9571c7111c` |
| [device.png](device.png) | 1536 × 1024 | `9950444bb091e2fd4c8945acca8b08302f4204d4f99714386251cbbc6636672b` |

All three images were visually inspected for readable labels, consistent character design, coherent reading order, and agreement with the documented workflow. The hero's first attempt had dark shading behind its headline and was rejected. Its corrected second attempt is the selected hero. The workflow graphic used that corrected hero as its sole visual reference. The device graphic used the hero for style and mascot consistency, plus Waveshare's dimension image for enclosure shape and proportions. It is an illustrative mockup, not a hardware test record.

The prompts below are a reproducibility record, not instructions for running pet production.

## Hero: initial generation

```text
Create one polished wide 3:2 editorial hero illustration for a GitHub README called "AI Pets Sprite Skill for Codex". This is a designed brand graphic, not a screenshot or photograph. A warm cream #FAF7F1 background, almost-black graphite #15171C typography, restrained mint #C3E1CD, coral #F26B4A, lavender #D8D1EF and pale blue #C9E3E8 accents. Friendly premium Japanese toy-design meets a contemporary maker's field guide. Clean controlled line work, subtle tactile paper texture, exceptionally generous whitespace, flat colors, precise graphic layout, no gradients.

Top-left small label: "AI PETS". Large left-aligned headline occupying the upper-left: "A little face." then "A lot of character." On the lower left small monospace text: "MAKE SOMETHING THAT FEELS ALIVE". Bottom-left tasteful "aipets.com". Use exactly these texts, spelled perfectly, no other words.

The right two thirds feature one entirely original adorable mint-green sprite creature, like a tiny pear-shaped garden spirit: soft square rounded body, a small two-leaf sprout on its head, two tiny dark vertical oval eyes, tiny mouth, coral cheek dots, short flipper arms, little rounded feet, cream belly. No antenna, no star, no existing AI Pets character. Render creature as sophisticated crisp pixel art with visible intentionally chunky pixels, a very readable silhouette and emotionally engaging face. Main pet smiles from a large round graphite preview disc on the right; this is a flat circular preview field, not a physical device. Around the main disc, arrange a modest pencil concept sketch on warm paper near upper right and a horizontal strip of four small square sprite frame tiles below: neutral, speaking, blinking, delight, showing the SAME character. Very thin hand-drawn arrows connect concept and finished frames, subtle coral emphasis, a few tiny sparkles. A tiny coral waveform near speech tile. Strong hierarchy, exquisite spacing, tasteful and genuinely memorable, legible at README width. Do not imply these are screenshots or real compiled outputs. No product hardware, no OpenAI logo, no fake UI, no badge soup, no excessive decorations, no text outside the specified four text groups.
```

## Hero: selected correction

Input: the initial hero output. Preserve its mascot and composition while fixing headline contrast.

```text
Edit this README hero illustration to fix a serious readability defect. Preserve the mint sprout sprite mascot, its face/shape/colors, the pencil sketch, the four bottom sprite tiles, and the exact headline and all wording. REMOVE EVERY dark smoky region, black vignette, cast shadow and gradient across the background, especially the huge black area behind the headline. The entire background MUST be a uniformly light warm cream #FAF7F1 with only imperceptible paper texture. The only large dark region allowed is the circular graphite preview disc immediately behind the big mascot. ALL text must be crisp nearly-black #15171C on a light cream background, clearly readable with high contrast. Flat editorial illustration with even neutral lighting, no cinematic lighting whatsoever. Make the top-left "AI PETS", the headline "A little face." / "A lot of character.", the bottom-left "MAKE SOMETHING THAT FEELS ALIVE" and "aipets.com" exceptionally legible. Keep composition, generous spacing and high-quality pixel art. Remove extra bottom-left landscape decoration and leave clean breathing room there. Output the entire corrected image, same wide 3:2 layout.
```

## Workflow: selected generation

Input: [hero.png](hero.png), as a visual style and mascot reference.

```text
Create a NEW companion infographic using the attached image only as the mascot and brand-style reference. Preserve exactly that adorable mint pear-shaped pixel-art sprout creature (two-leaf sprout, tiny vertical dark eyes, coral cheeks, cream belly, little flipper arms/feet). Make a beautiful flat editorial six-step process infographic for AI Pets Sprite Skill for Codex. Wide 3:2 landscape composition, warm cream #FAF7F1 everywhere, dark graphite #15171C text, mint #C3E1CD and restrained coral #F26B4A accents. No shadows, no gradients, no vignette, no dark smoky regions. Even neutral illustration, clean geometry, no hardware photograph, no fake app screenshot.

Top: small label "AI PETS / SPRITE SKILL". Strong readable heading "From an idea to a little life." Bottom-right small "aipets.com".

Below heading, a perfectly aligned two-row, three-column editorial grid of SIX equally sized panels separated by thin warm-gray rules, with substantial gutters and generous whitespace. Reading order left to right, top row then bottom row. Each panel has a coral two-digit step number, a short bold dark heading, one large clear illustration. No other text.

Panel 01 heading "Describe". Illustration: simple cream chat bubble with a tiny sprout icon and pencil next to a loose pencil sketch of the pet. No text inside chat bubble.
Panel 02 heading "Refine". Illustration: three small character concept cards, same creature with slightly different expressions; one selected large clean front-facing neutral pet and a coral checkmark. Human chooses the look.
Panel 03 heading "Animate". Illustration: a 2 by 3 grid of consistent COMPLETE frames of the pet, clearly distinct mouth-open, blink, neutral, happy, curious, waving. Tiny coral waveform and sparkling effect dots outside the frame grid.
Panel 04 heading "Review". Illustration: a magnifying glass over a sprite strip, emphasizing eyes and mouth; one readable circular crop guide, a small checkmark. This represents exact-frame review.
Panel 05 heading "Preview". Illustration: abstract simple browser window showing the pet inside a round dark graphite preview field with a small play triangle beneath and tiny speech level bars, no fake text. This is the actual concept of a local preview, not a hardware device.
Panel 06 heading "Export". Illustration: neat small stack of sprite-sheet pages beside a cream package/file with the SINGLE exact text ".aipetframes" printed legibly across its front. A mint checkmark. No upload arrow or cloud icon because this produces a local pack.

Keep typography large, consistent and absolutely correct. Text must be readable when displayed at 900px wide. Original high-quality pixel illustrations and sophisticated editorial spacing. All six numbered steps must appear once and only once. Only the specified labels, headings, filename extension and footer. Preserve the coherent cute mascot and color palette from the reference, but create this entirely new layout.
```

## Device: selected generation

Inputs: [hero.png](hero.png) for style and mascot; [Waveshare's product-dimensions image](https://docs.waveshare.com/assets/images/ESP32-S3-Touch-LCD-1.85B-details-size-dcfac2c13a270a2e84bec0d5a05b939b.webp) for hardware shape. The third-party reference is not redistributed in this skill. Model identification and display specifications were checked against the [official board documentation](https://docs.waveshare.com/ESP32-S3-Touch-LCD-1.85B).

```text
Create a new beautiful editorial infographic for the AI Pets Sprite Skill for Codex README, matching the style of reference image 1. Reference image 1 is ONLY the visual style and ORIGINAL MINT SPROUT MASCOT reference. Reference image 2 is ONLY the precise REAL HARDWARE SHAPE reference: Waveshare ESP32-S3-Touch-LCD-1.85B. Do not copy its technical drawing or measurement labels. Show a new illustrated view of that actual silver round aluminum puck with the original mint pixel mascot displayed on its circular black screen. This is an explicitly illustrative product mockup, not a photograph or proof of deployment.

Wide landscape 3:2 editorial layout, warm cream #FAF7F1 background, clean dark graphite typography, mint #C3E1CD and coral #F26B4A accents. Flat clean brand design with controlled subtle brushed-metal shading ONLY on device casing. No cinematic lighting, no dark background vignette, no gradients behind text. Generous whitespace, premium playful maker field-guide look.

Top-left small "AI PETS / ON YOUR DESK". Large headline: "Give your pet a place to live."

Lower-left and center: one large beautiful accurate silver aluminum puck at a modest three-quarter angle, clearly round with a softly domed rim, black circular glass front and recessed inner circular active display. Match reference proportions: casing 61.6 mm wide and 14.6 mm thick, display approximately 46 mm wide. Thin metallic outer edge, broad black glass bezel, NOT a square device, NOT a smartwatch, no wrist strap, no giant external antenna, no speaker grille on the front. On the visible side, preserve the small controls and oblong flush USB dust-cover detail suggested by the reference. On screen, place the identical mint pear-shaped pixel sprout creature from reference 1, two-leaf sprout, coral cheek dots, cream belly, tiny flipper arms, dark vertical eyes and a cheerful speaking mouth. Pixel art crisp; the whole creature fits the round screen with comfortable margins. A few understated coral speech-wave marks outside the puck communicate talking.

Beneath the puck, exactly two short dark readable label lines:
"Waveshare ESP32-S3"
"1.85-inch round touch display"

Right side, three vertically stacked compact editorial entries with small line icons, clear type and thin warm-gray separators. These are the three parts of the system:
"01  SPRITE SKILL"
"Create the face"
(icon: two small complete sprite frames)
"02  AI PETS FIRMWARE"
"Run the device"
(icon: simple microchip)
"03  AIPETS.COM"
"Connect the voice"
(icon: clean speech bubble and small cloud)
Keep the three entries balanced, spacious and aligned, with discreet connecting lines down the right side. No extra technical claims. Bottom-right "aipets.com". Typography must be absolutely accurate and high contrast. No other words, logos or marks. Show exactly one main physical device and no phone or computer. This image should make the tangible outcome of sprite creation obvious while fitting seamlessly with the original README artwork.
```
