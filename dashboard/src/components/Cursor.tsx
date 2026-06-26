"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let x = 0;
    let y = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.matches("a, button, [role='button'], input, select, textarea") ||
        !!target.closest("a, button, [role='button'], input, select, textarea");
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleMouseOver);

    let frame: number;

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
        flex
        items-center
        justify-center
        rounded-full
        border-2
        border-[#c7ef2f]            // your melon-green
        shadow-[0_0_8px_rgba(199,239,47,0.25)]
        transition-all
        duration-150
        ease-out

        // Responsive ring sizes (generous)
        h-8 w-8
        sm:h-10 sm:w-10
        md:h-12 md:w-12
        lg:h-14 lg:w-14

        // Hover: grow + slightly brighter glow
        ${isHovering ? "scale-110 shadow-[0_0_14px_rgba(199,239,47,0.4)]" : ""}
      `}
    >
      {/* Tiny dot – 3px, with a gentle pulse (no conflict) */}
      <div
        className={`
          rounded-full
          bg-[#c7ef2f]
          opacity-90
          transition-all
          duration-200
          h-[3px] w-[3px]
          animate-pulse        // works on dot only, safe
          ${isHovering ? "scale-150" : ""}
        `}
      />
    </div>
  );
}