
import Logo from "@/components/Logo";

/** Links do portfólio / perfis profissionais */
const personalLinks = [
  { title: "GitHub", href: "https://github.com/MultMan02/UniverseEx" },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/daran-soares" },
];

/** Estudos de caso / variações do site (troque pelos seus) */
const projectLinks = [
  { title: "UniverseEx", href: "https://github.com/MultMan02/UniverseEx" },
];

/** Referências oficiais NASA */
const nasaLinks = [
  { title: "NASA APIs", href: "https://api.nasa.gov" },
  { title: "Site principal", href: "https://www.nasa.gov" },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/nasa" },
];

/** Ícones SVG inline (sem dependências) */
function IconGitHub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.8-.25.8-.56v-2c-3.26.71-3.95-1.57-3.95-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.74 1.27 3.4.97.1-.76.41-1.27.75-1.56-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.21-3.15-.12-.3-.53-1.52.11-3.16 0 0 .99-.32 3.24 1.2a11.2 11.2 0 0 1 5.9 0c2.25-1.52 3.24-1.2 3.24-1.2.64 1.64.23 2.86.11 3.16.75.82 1.21 1.87 1.21 3.15 0 4.52-2.75 5.5-5.37 5.79.42.36.8 1.08.8 2.18v3.23c0 .31.22.68.81.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 5 2.12 5 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.27 2.32-2.6 4.78-2.6C21.6 7.6 24 10 24 14.2V24h-5v-8.6c0-2.05-.04-4.68-2.85-4.68-2.85 0-3.28 2.23-3.28 4.54V24H8z"
      />
    </svg>
  );
}

function IconExternal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
      />
    </svg>
  );
}

function IconEmail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 
           2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 
           4-8 5-8-5V6l8 5 8-5v2Z"
      />
    </svg>
  );
}

export default function MultiColumns() {
  return (
    <footer className="mt-28 bg-slate-50 dark:bg-neutral-950">
      {/* Linha decorativa com gradiente (sutil) */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      {/* Conteúdo principal */}
      <div className="container mx-auto flex flex-col items-start gap-12 px-8 pb-8 pt-12 md:flex-row md:gap-12 md:px-12">
        {/* Branding + descrição + social */}
        <div className="flex w-full flex-col items-center gap-4 text-center md:w-[40%] md:items-start md:text-left">
          <Logo />
          <p className="max-w-prose text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium text-slate-800 dark:text-white">Universe</span><span className="text-sky-400 font-bold">Ex</span>: galeria para
            explorar fotos reais de Marte capturadas pelos Rovers da NASA, com busca, filtros e paginação.
          </p>

          

          {/* Badge open-source / CTA */}
          <a
            href="https://github.com/MultMan02/UniverseEx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:shadow hover:border-slate-400 dark:border-slate-800 dark:bg-neutral-900 dark:text-slate-200 dark:hover:border-slate-700"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Open-source no GitHub
            <IconExternal className="h-4 w-4" />
          </a>
        </div>

        {/* Colunas de links */}
        <div className="grid w-full grid-cols-1 gap-8 text-center text-slate-600 dark:text-slate-300 sm:grid-cols-2 md:w-[60%] md:text-left lg:grid-cols-3">
          {/* Portfólio */}
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-white">Meu Trabalho</div>
              {/* Social: GitHub / LinkedIn / X */}
            <div className="mt-2 flex items-center gap-3">
              <a
                href="https://github.com/MultMan02/UniverseEx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub do projeto"
                className="rounded-md p-2 text-slate-600 transition hover:text-slate-900 hover:bg-slate-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
                title="Star no GitHub"
              >
                <IconGitHub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/daran-soares"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn do autor"
                className="rounded-md p-2 text-slate-600 transition hover:text-slate-900 hover:bg-slate-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
                title="Perfil no LinkedIn"
              >
                <IconLinkedIn className="h-5 w-5" />
              </a>
              <a
                href="mailto:daran02soares02@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Me contate!"
                className="rounded-md p-2 text-slate-600 transition hover:text-slate-900 hover:bg-slate-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
                title="Perfil no X"
              >
                <IconEmail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Projetos */}
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white">Projetos</div>
            <ul className="mt-2 space-y-2 text-sm">
              {projectLinks.map(({ title, href }, i) => (
                <li key={i}>
                  <a
                    className="underline decoration-transparent underline-offset-4 transition hover:decoration-slate-700 dark:hover:decoration-slate-200"
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

          {/* NASA */}
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white">NASA</div>
            <ul className="mt-2 space-y-2 text-sm">
              {nasaLinks.map(({ title, href }, i) => (
                <li key={i}>
                  <a
                    className="underline decoration-transparent underline-offset-4 transition hover:decoration-slate-700 dark:hover:decoration-slate-200"
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
      </div>

      {/* Barra inferior */}
      <div className="container mx-auto border-t border-slate-200/70 px-8 py-6 text-center text-xs text-slate-600 dark:border-slate-900 dark:text-slate-400 md:px-12">
        &copy; {new Date().getFullYear()} UniverseEx. Dados: NASA Mars Rover Photos API.
      </div>
    </footer>
  );
}

