import * as THREE from "three";
import { clay } from "@/lib/tokens";

export type ClayColor = keyof typeof clay;

/** One shared matte clay material per colour (MeshStandardMaterial, no textures). */
const materials = new Map<ClayColor, THREE.MeshStandardMaterial>();

export function clayMaterial(color: ClayColor) {
  let m = materials.get(color);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color: clay[color], roughness: 0.9, metalness: 0 });
    materials.set(color, m);
  }
  return m;
}

type ClayMeshProps = Omit<React.JSX.IntrinsicElements["mesh"], "geometry" | "material"> & {
  geometry: THREE.BufferGeometry;
  color: ClayColor;
};

/** A mesh with shared clay geometry and material. */
export function ClayMesh({ geometry, color, ...props }: ClayMeshProps) {
  return <mesh geometry={geometry} material={clayMaterial(color)} {...props} />;
}
