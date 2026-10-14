/** Normalised pointer position (-1..1) shared by the scenes; mouse only. */
export const pointer = { x: 0, y: 0, touch: false };

let bound = false;
export function bindPointer() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  pointer.touch = window.matchMedia("(hover: none)").matches;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}

/** `?3d=still` freezes idle motion in each object's designed pose (used to render fallbacks). */
export const stillMode =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).get("3d") === "still";
