/** Soft studio light: warm key, cool fill, sky/ground hemisphere. */
export default function Lights({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <hemisphereLight args={["#FFF6EC", "#3A4566", 1.1 * intensity]} />
      <ambientLight intensity={0.45 * intensity} />
      <directionalLight position={[3, 5, 5]} intensity={2.3 * intensity} color="#FFE6CF" />
      <directionalLight position={[-5, 1.5, 2]} intensity={0.8 * intensity} color="#CFDBFF" />
    </>
  );
}
