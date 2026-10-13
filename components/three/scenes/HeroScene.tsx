"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { ClayMesh } from "@/components/three/ClayMaterial";
import Float from "@/components/three/Float";
import { cylinder } from "@/components/three/geometry";
import Lights from "@/components/three/Lights";
import ChatBubble from "@/components/three/objects/ChatBubble";
import MapPin from "@/components/three/objects/MapPin";
import Megaphone from "@/components/three/objects/Megaphone";
import Star from "@/components/three/objects/Star";
import Storefront from "@/components/three/objects/Storefront";
import { bindPointer, pointer, stillMode } from "@/components/three/pointer";
import SceneCamera from "@/components/three/SceneCamera";

const MAX_TILT = THREE.MathUtils.degToRad(8);
const STORE = new THREE.Vector3(0, 1, 0);

// Where each floating tool starts, and how far it drifts toward the store on scroll.
const FLOATERS = [
  { start: new THREE.Vector3(-2.05, 2.35, 0.4), scale: 0.78, phase: 0 },
  { start: new THREE.Vector3(1.95, 2.55, 0.2), scale: 0.72, phase: 1.6 },
  { start: new THREE.Vector3(-2.15, 0.55, 1.1), scale: 0.72, phase: 3.1 },
  { start: new THREE.Vector3(2.05, 0.75, 1.0), scale: 0.66, phase: 4.4 },
];

/** Storefront on a cream plinth; megaphone, chat bubble, map pin and star float around it. */
export default function HeroScene() {
  const tilt = useRef<THREE.Group>(null);
  const fit = useRef<THREE.Group>(null);
  const floaters = useRef<(THREE.Group | null)[]>([]);
  const hero = useRef<HTMLElement | null>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));

  useEffect(() => {
    hero.current = document.getElementById("hero");
    bindPointer();
  }, []);

  useFrame(({ clock }) => {
    const g = tilt.current;
    if (!g || stillMode) return;
    let ty: number;
    let tx: number;
    if (pointer.touch) {
      const t = clock.elapsedTime * 0.35;
      ty = Math.sin(t) * MAX_TILT * 0.7;
      tx = Math.sin(t * 0.6) * MAX_TILT * 0.25;
    } else {
      ty = pointer.x * MAX_TILT;
      tx = -pointer.y * MAX_TILT * 0.6;
    }
    g.rotation.y += (ty - g.rotation.y) * 0.05;
    g.rotation.x += (tx - g.rotation.x) * 0.05;

    // Scroll: the floating tools gather around the store as the hero leaves.
    const rect = hero.current?.getBoundingClientRect();
    const p = rect ? THREE.MathUtils.clamp(-rect.top / (rect.height * 0.7), 0, 1) : 0;
    const eased = 1 - Math.pow(1 - p, 3);
    floaters.current.forEach((f, i) => {
      if (!f) return;
      tmp.copy(FLOATERS[i].start).lerp(STORE, eased * 0.5);
      f.position.lerp(tmp, 0.12);
    });
  });

  const scale = Math.min(1, aspect / 1.15);

  return (
    <>
      <SceneCamera position={[0, 1.6, 9]} target={[0, 1.05, 0]} fov={32} />
      <Lights />
      <group ref={fit} scale={scale}>
        <group ref={tilt}>
          <ClayMesh geometry={cylinder(1.85, 1.85, 0.32, 64)} color="cream" position={[0, -0.16, 0]} />
          <Storefront />
          <ContactShadows position={[0, 0.005, 0]} scale={4} blur={2.4} far={2.5} opacity={0.32} frames={1} resolution={256} color="#26314D" />
          {FLOATERS.map((f, i) => (
            <group key={i} ref={(el) => void (floaters.current[i] = el)} position={f.start} scale={f.scale}>
              <Float amp={0.1} speed={0.9} phase={f.phase} sway={0.18}>
                {i === 0 && <Megaphone rotation={[0, 0.5, 0.25]} />}
                {i === 1 && <ChatBubble rotation={[0, -0.35, 0]} />}
                {i === 2 && <MapPin color="orange" rotation={[0, 0.4, 0]} />}
                {i === 3 && <Star rotation={[0, -0.4, 0.15]} />}
              </Float>
            </group>
          ))}
        </group>
      </group>
    </>
  );
}
