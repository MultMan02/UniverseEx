export default function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-400 flex flex-wrap gap-2 items-center justify-between">
        <p>© {new Date().getFullYear()} UniverseEx • Galeria de Fotos dos Rovers em Marte</p>
        <p>Data from NASA Mars Rover Photos API</p>
      </div>
    </footer>
  );
}
