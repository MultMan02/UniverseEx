// export default function Footer() {
//   return (
//     <footer className="mt-10 border-t border-neutral-800">
//       <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-400 flex flex-wrap gap-2 items-center justify-between">
//         <p>© {new Date().getFullYear()} UniverseEx • Galeria de Fotos dos Rovers em Marte</p>
//         <p>Data from NASA Mars Rover Photos API</p>
//       </div>
//     </footer>
//   );
// }
import Logo from "@/components/Logo";

const personalLinks = [
  {
    title: 'GitHub',
    href: 'https://github.com/MultMan02/UniverseEx',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/daran-soares',
  },
];

const inceptionLinks = [
  {
    title: 'This Site',
    href: '#',
  },
  {
    title: 'This Site II',
    href: '#',
  },
];

const nasaLinks = [
  {
    title: 'NASA APIs',
    href: 'https://api.nasa.gov',
  },
  {
    title: 'Main Website',
    href: 'https://www.nasa.gov',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/nasa',
  },
];

export default function MultiColumns() {
  return (
    <footer className="mt-28 bg-slate-50 dark:bg-black">
      <div className="container mx-auto flex flex-col items-start space-y-12 px-8 pb-8 pt-12 md:flex-row md:space-y-0 md:space-x-12 md:px-12">
        <div className="flex w-full flex-col space-y-4 text-center md:w-2/5 md:text-left">
          <Logo />
          <p className="text-sm text-slate-600">
            UniverseEx uma galeria de procura de fotos de Rovers de Marte.
          </p>
        </div>
        <div className="w-full text-center text-slate-600 md:w-1/5 md:text-left">
          <div className="text-sm font-semibold">My Work</div>
          <ul className="text-sm">
            {personalLinks.map(({ title, href }, index) => (
              <li className="pt-3" key={index}>
                <a
                  className="underline decoration-transparent underline-offset-4 transition hover:decoration-slate-700"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full text-center text-slate-600 md:w-1/5 md:text-left">
          <div className="text-sm font-semibold">Inceptions</div>
          <ul className="text-sm">
            {inceptionLinks.map(({ title, href }, index) => (
              <li className="pt-3" key={index}>
                <a
                  className="underline decoration-transparent underline-offset-4 transition hover:decoration-slate-700"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full text-center text-slate-600 md:w-1/5 md:text-left">
          <div className="text-sm font-semibold text-slate-600">
            NASA Links
          </div>
          <ul className="text-sm">
            {nasaLinks.map(({ title, href }, index) => (
              <li className="pt-3" key={index}>
                <a
                  className="underline decoration-transparent underline-offset-4 transition hover:decoration-slate-700"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto border-t border-slate-200 p-8 text-center text-sm text-slate-600 dark:border-slate-900 md:flex-row md:px-12">
        &copy; {new Date().getFullYear()} UniverseEx . Data from NASA Mars Rover Photos API.
      </div>
    </footer>
  );
}