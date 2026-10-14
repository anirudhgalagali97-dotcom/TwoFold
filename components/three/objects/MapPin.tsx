import { ClayMesh, type ClayColor } from "@/components/three/ClayMaterial";
import { cylinder, extrudeSvg } from "@/components/three/geometry";
import type { GroupProps } from "./types";

const PIN = [
  "M50 98 C30 74 16 60 16 40 A34 34 0 0 1 84 40 C84 60 70 74 50 98 Z M36 40 A14 14 0 0 0 64 40 A14 14 0 0 0 36 40 Z",
];

/** Google profile and local SEO: extruded pin with a cream centre. */
export default function MapPin({ color = "inkBlue", ...props }: GroupProps & { color?: ClayColor }) {
  // Pin outline spans x 16–84, y 6–98 in the SVG box; centre of the hole sits 0.11 above the middle.
  return (
    <group {...props}>
      <ClayMesh geometry={extrudeSvg("pin", PIN, { size: 1.2 })} color={color} />
      <ClayMesh geometry={cylinder(0.15, 0.15, 0.22)} color="cream" position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}
