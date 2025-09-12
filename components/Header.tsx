"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Filters from "@/components/Filters";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">

        {/* ---------- Mobile / Tablet (<lg): keep normal behaviour ---------- */}
        <div className="flex items-center justify-between lg:hidden">
          <Logo />
          <nav className="text-sm text-neutral-400">
            <a className="hover:text-white" href="https://api.nasa.gov/">
              NASA APIs
            </a>
          </nav>
        </div>

        {/* ---------- Desktop (lg+): logo always left, center swaps ---------- */}
        <div className="hidden lg:flex items-center">
          {/* Left: Logo always visible */}
          <div className="w-[160px] shrink-0">
            <Logo />
          </div>

          {/* Center: Title (before scroll) or Filters (after scroll) */}
          <div className="flex-1 flex justify-center">
            {scrolled ? (
              <div className="w-full max-w-3xl">
                <Filters />
              </div>
            ) : (
              <h1 className="text-xl font-semibold tracking-wide text-center">
                Mars Rover Gallery
              </h1>
            )}
          </div>

          {/* Right: nav */}
          <div className="w-[160px] shrink-0 flex items-center justify-end">
            <nav className="text-sm text-neutral-400">
              <a className="hover:text-white" href="https://api.nasa.gov/">
                NASA APIs
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}