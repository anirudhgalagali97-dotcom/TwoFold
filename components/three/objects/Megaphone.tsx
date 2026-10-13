import { ClayMesh } from "@/components/three/ClayMaterial";
import { cylinder, roundedBox, torus } from "@/components/three/geometry";
import type { GroupProps } from "./types";

/** Marketing and ads: orange cone body, ink-blue handle, cream mouthpiece. */
export default function Megaphone(props: GroupProps) {
  return (
    <group {...props}>
      <group rotation={[0, 0, -Math.PI / 2]}>
        <ClayMesh geometry={cylinder(0.2, 0.62, 1.1)} color="orange" />
        <ClayMesh geometry={torus(0.6, 0.07)} color="orange" position={[0, -0.56, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <ClayMesh geometry={cylinder(0.56, 0.56, 0.04)} color="inkBlue" position={[0, -0.56, 0]} />
        <ClayMesh geometry={cylinder(0.16, 0.2, 0.26)} color="cream" position={[0, 0.66, 0]} />
      </group>
      <ClayMesh geometry={roundedBox(0.2, 0.46, 0.2, 0.08)} color="inkBlue" position={[-0.18, -0.34, 0]} rotation={[0, 0, 0.25]} />
    </group>
  );
}
