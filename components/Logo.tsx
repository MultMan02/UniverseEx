"use client";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group relative inline-block">
      <Image
        src="/images/logo.png"
        alt="UniverseEx Logo"
        width={120}
        height={120}
        className="h-16 w-auto object-contain transition duration-700 group-hover:brightness-125 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = "none"; // hide broken image
          target.insertAdjacentHTML(
            "afterend",
            `<h1 class="text-lg font-semibold tracking-wide logo-fallback"><span class="transition duration-700 group-hover:brightness-125 text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">Universe</span><span class="font-bold text-lg text-sky-400">Ex</span></h1>`
          );
        }}
      />
    </Link>
  );
}
