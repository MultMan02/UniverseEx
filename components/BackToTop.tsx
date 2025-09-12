"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 200);
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={toTop}
      aria-label="Back to top"
      className={[
        "group fixed bottom-6 left-[84%] md:left-[95%] -translate-x-1/2 z-50",
        // base
        "h-12 w-12 rounded-full border-none bg-neutral-900",
        "flex items-center justify-center overflow-hidden",
        // subtle ring glow
        "shadow-[0_0_0_3px_rgba(14,165,233,0.25)]", // sky-400 tint
        // transitions + hover expansion (opens both sides)
        "transition-all duration-300 hover:w-36",
        // show/hide based on scroll
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      {/* Arrow */}
      <svg
        viewBox="0 0 384 512"
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-12"
      >
        <path
          fill="white"
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        />
      </svg>

      {/* Label */}
      <span
        className={[
          "absolute text-[0px] text-white text-shadow-[0_0_5px_black]",
          "transition-all duration-300",
          "group-hover:text-sm",
        ].join(" ")}
      >
        Back to Top
      </span>

      {/* Hover color layer (sky-400) */}
      <div
        className={[
          "absolute inset-0 -z-10 rounded-full",
          "bg-transparent group-hover:bg-sky-400",
          "transition-colors duration-300",
        ].join(" ")}
      />
    </button>
  );
}
