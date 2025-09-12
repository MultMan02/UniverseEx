import Logo from "./Logo";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Logo />
          <h1 className="text-lg font-semibold tracking-wide">
                Mars Rover Gallery
          </h1>
        </div>
        <nav className="text-sm text-neutral-400">
          <a className="hover:text-white" href="https://api.nasa.gov/">
            NASA APIs
          </a>
        </nav>
      </div>
    </header>
  );
}
