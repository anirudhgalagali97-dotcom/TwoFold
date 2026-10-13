"use client";

import { useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { setThreeStatus } from "@/components/three/threeStore";

/** Marks the 3D ready after the first rendered frame, and (with ?3d=debug) reports draw calls. */
function Monitor() {
  const gl = useThree((s) => s.gl);
  const [debug] = useState(() => new URLSearchParams(window.location.search).get("3d") === "debug");
  useFrame(() => gl.info.reset(), -1);
  useFrame(() => {
    setThreeStatus("ready");
    if (debug) {
      const w = window as unknown as { __drawCalls: number; __frames: number };
      w.__drawCalls = gl.info.render.calls;
      w.__frames = (w.__frames ?? 0) + 1;
    }
  }, 10);
  return null;
}

/**
 * The one shared canvas, fixed over the page (pointer-events off). Each
 * SceneSlot's View is scissored into its own box. Rendering stops when no
 * slot is on screen or the tab is hidden.
 */
export default function Scene() {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const visible = new Set<Element>();
    const update = () => setRunning(visible.size > 0 && !document.hidden);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      update();
    });
    document.querySelectorAll("[data-scene]").forEach((el) => io.observe(el));
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <Canvas
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 30 }}
      dpr={[1, 1.5]}
      flat
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Views render several times per frame; count draw calls per frame, not per render.
      onCreated={({ gl }) => void (gl.info.autoReset = false)}
    >
      <View.Port />
      <Monitor />
    </Canvas>
  );
}
