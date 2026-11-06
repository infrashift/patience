---
title: Calibration
description: Align PATIENCE's eye sockets and jaw hinge to the subject's anatomy.
---

Every cat's cranial geometry is slightly different. Click **Calibrate Eyes and Mouth** in the lower control bar to unlock the alignment HUD.

| Action | Mouse / trackpad | Touch screen |
| :--- | :--- | :--- |
| Move a feature | Drag the **Left Eye (Min)**, **Right Eye (Hr)**, or **Mouth / Jaw Hinge** handle | Drag with one finger |
| Resize a feature | Scroll wheel over the handle | Pinch with two fingers over the handle |

Fur and skin pixels are sampled automatically (`sampleSubjectSkin`), so eyelid shading is recalculated in real time as you move things around.

## Saving your calibration

Tick **Developer Mode** to show the live `SUBJECTS[0]` coordinates, then click **Copy Config** and paste the values into the `SUBJECTS` array in `public/clock/index.html`.
