"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import Lights from "@/components/three/Lights";
import PaperPlane from "@/components/three/objects/PaperPlane";
import { stillMode } from "@/components/three/pointer";
import SceneCamera, { useViewSize } from "@/components/three/SceneCamera";
import { clay } from "@/lib/tokens";

const LOOP_SECONDS = 14;

/** A paper plane flying a slow loop along a dashed trail. */
export default function ContactScene() {
  const viewport = useViewSize(32, 8);
  const plane = useRef<THREE.Group>(null);
  const ahead = useMemo(() => new THREE.Vector3(), []);

  const curve = useMemo(() => {
    const w = viewport.width * 0.4;
    const h = viewport.height * 0.3;
    const pts = Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * w, Math.sin(a * 2) * h * 0.6 + Math.sin(a) * h * 0.5, Math.sin(a) * 0.8);
    });
    return new THREE.CatmullRomCurve3(pts, true, "centripetal");
  }, [viewport.width, viewport.height]);
  const points = useMemo(() => curve.getSpacedPoints(160), [curve]);

  useFrame(({ clock }) => {
    const g = plane.current;
    if (!g) return;
    const u = stillMode ? 0.18 : (clock.elapsedTime / LOOP_SECONDS) % 1;
    g.position.copy(curve.getPointAt(u));
    g.lookAt(ahead.copy(curve.getPointAt((u + 0.01) % 1)));
  });

  return (
    <>
      <SceneCamera position={[0, 0, 8]} fov={32} />
      <Lights />
      <Line points={points} color={clay.cream} lineWidth={2} dashed dashSize={0.12} gapSize={0.1} transparent opacity={0.85} />
      <group ref={plane}>
        {/* lookAt points +Z forward; the plane's nose is +X */}
        <PaperPlane rotation={[0, -Math.PI / 2, 0]} scale={0.9} />
      </group>
    </>
  );
}
