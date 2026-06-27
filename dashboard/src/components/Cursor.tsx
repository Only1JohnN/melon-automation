"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  const SMOOTH = 0.15; // idle follow smoothness

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive =
        el.matches?.("a, button, [role='button'], input, select, textarea") ||
        !!el.closest?.("a, button, [role='button'], input, select, textarea");
      setIsHovering(interactive);
      isHoveringRef.current = interactive;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    let frame: number;

    const animate = () => {
      // ---- Dot: always instant ----
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }

      const hovering = isHoveringRef.current;

      // ---- Ring position ----
      if (hovering) {
        // Snap to mouse when hovering interactive elements
        current.current.x = target.current.x;
        current.current.y = target.current.y;
      } else {
        // Smooth follow when idle
        current.current.x += (target.current.x - current.current.x) * SMOOTH;
        current.current.y += (target.current.y - current.current.y) * SMOOTH;
      }

      // ---- Ring scale: smaller on hover (0.5), normal (1) when idle ----
      const scale = hovering ? 0.5 : 1;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%) scale(${scale})`;
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* ---- Dot: invisible on hover, visible otherwise ---- */}
      <div
        ref={dotRef}
        className="
          pointer-events-none
          fixed left-0 top-0 z-[9999]
          w-1 h-1
          rounded-full
          bg-[#c7ef2f]
          shadow-[0_0_6px_rgba(199,239,47,0.6)]
          transition-opacity duration-200
          will-change-transform
        "
        style={{ opacity: isHovering ? 0 : 1 }}
      />

      {/* ---- Ring: shrinks and fills on hover ---- */}
      <div
        ref={ringRef}
        className={`
          pointer-events-none
          fixed left-0 top-0 z-[9998]
          rounded-full
          border-2 border-[#c7ef2f]
          shadow-[0_0_12px_rgba(199,239,47,0.2)]
          will-change-transform

          // Responsive base size (idle)
          h-8 w-8
          sm:h-10 sm:w-10
          md:h-12 md:w-12
          lg:h-14 lg:w-14

          // Visual changes on hover: filled, tighter glow
          ${isHovering
            ? "bg-[#c7ef2f] bg-opacity-20 border-opacity-80 shadow-[0_0_20px_rgba(199,239,47,0.4)]"
            : "bg-transparent"
          }
        `}
        style={{
          transition:
            "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      />
    </>
  );
}