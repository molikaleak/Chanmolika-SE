import { useEffect, useRef } from "react";

export default function StarFollower() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;

      if (starRef.current) {
        starRef.current.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          translate(-50%, -50%)
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={starRef}
      className="
        pointer-events-none
        fixed
        top-0 left-0
        z-[9999]
      "
    >
      {/* ✨ ATOM CORE */}
      <div
        className="
          w-[6px] h-[6px]
          rounded-full
          bg-white
        "
      />

      {/* 🌈 MAGIC DUST CLOUD (looks like many particles) */}
      <div
        className="
          absolute inset-[-6px]
          rounded-full
          bg-[radial-gradient(circle,rgba(255,220,255,0.9),rgba(150,200,255,0.6),rgba(255,150,220,0.4),transparent_70%)]
          blur-[6px]
        "
      />

      {/* 💫 INNER ENERGY */}
      <div
        className="
          absolute inset-[-10px]
          rounded-full
          bg-[radial-gradient(circle,rgba(255,200,255,0.5),rgba(120,160,255,0.35),transparent_75%)]
          blur-[10px]
          animate-pulse
        "
      />

      {/* 🌟 MICRO SPARK SHIMMER */}
      <div
        className="
          absolute inset-[-14px]
          rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.25),transparent_70%)]
          blur-[14px]
          opacity-50
        "
      />
    </div>
  );
}
