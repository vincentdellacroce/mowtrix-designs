/** Sage radial wash behind sub-page headers — static CSS, no WebGL. */
export default function HeaderMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-75 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
      style={{
        background:
          "radial-gradient(ellipse 90% 65% at 72% -5%, #cfe3c0 0%, #ddebd4 35%, #eef4ea 65%, transparent 90%)",
      }}
    />
  );
}
