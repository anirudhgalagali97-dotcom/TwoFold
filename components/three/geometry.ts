import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Geometry factories with a shared cache, so every object reuses the same
 * BufferGeometry instances across scenes (fewer uploads, less memory).
 */
const cache = new Map<string, THREE.BufferGeometry>();
function cached<T extends THREE.BufferGeometry>(key: string, make: () => T): T {
  let g = cache.get(key) as T | undefined;
  if (!g) {
    g = make();
    cache.set(key, g);
  }
  return g;
}

/** Rounded box; radius defaults to a soft 22% of the smallest side. */
export const roundedBox = (w: number, h: number, d: number, r = Math.min(w, h, d) * 0.22) =>
  cached(`rb:${w}:${h}:${d}:${r}`, () => new RoundedBoxGeometry(w, h, d, 4, r));

export const cylinder = (rTop: number, rBottom: number, h: number, seg = 40) =>
  cached(`cy:${rTop}:${rBottom}:${h}:${seg}`, () => new THREE.CylinderGeometry(rTop, rBottom, h, seg));

export const sphere = (r: number) => cached(`sp:${r}`, () => new THREE.SphereGeometry(r, 32, 20));

export const torus = (R: number, r: number, arc = Math.PI * 2) =>
  cached(`to:${R}:${r}:${arc}`, () => new THREE.TorusGeometry(R, r, 16, 48, arc));

/** Several placed copies of geometries merged into one (one draw call). */
export function merged(key: string, parts: () => THREE.BufferGeometry[]) {
  return cached(`mg:${key}`, () => mergeGeometries(parts().map((g) => g.toNonIndexed()), false)!);
}

type ExtrudeOptions = {
  /** Final size in world units of the 100-unit SVG design box. */
  size?: number;
  /** Extrusion depth and bevel, in SVG units (bevel 4–8% of the object). */
  depth?: number;
  bevel?: number;
  /** Centre the result on the origin (default true). */
  center?: boolean;
};

/**
 * Extrudes SVG path data (drawn in a 100×100 box, y down) into a soft,
 * bevelled clay solid. Each string is its own path, so separate parts never
 * cut holes in each other; holes inside one path use evenodd.
 */
export function extrudeSvg(key: string, paths: string | string[], opts: ExtrudeOptions = {}) {
  const { size = 1, depth = 22, bevel = 6, center = true } = opts;
  return cached(`svg:${key}`, () => {
    const list = Array.isArray(paths) ? paths : [paths];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg">${list
      .map((d) => `<path fill="#000" fill-rule="evenodd" d="${d}"/>`)
      .join("")}</svg>`;
    const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => p.toShapes());
    const g = new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 5,
      curveSegments: 18,
    });
    // SVG y points down: rotate 180° about X (keeps face winding, unlike a mirror).
    g.rotateX(Math.PI);
    if (center) g.center();
    g.scale(size / 100, size / 100, size / 100);
    g.computeVertexNormals();
    return g;
  });
}

/** SVG path for a five-point star with rounded tips. */
export function roundedStarPath(cx = 50, cy = 50, outer = 50, inner = 23, round = 0.2) {
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? outer : inner;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  const lerp = (a: [number, number], b: [number, number], t: number) =>
    `${(a[0] + (b[0] - a[0]) * t).toFixed(2)} ${(a[1] + (b[1] - a[1]) * t).toFixed(2)}`;
  let d = `M${lerp(pts[9], pts[0], 1 - round)}`;
  for (let i = 0; i < 10; i += 2) {
    const tip = pts[i];
    const next = pts[i + 1];
    const after = pts[(i + 2) % 10];
    d += ` Q${tip[0].toFixed(2)} ${tip[1].toFixed(2)} ${lerp(tip, next, round)}`;
    d += ` L${next[0].toFixed(2)} ${next[1].toFixed(2)} L${lerp(next, after, 1 - round)}`;
  }
  return d + " Z";
}
