import Logo from "@/components/Logo";

/**
 * Links pessoais (portfolio do candidato) exibidos na coluna "My Work".
 */
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

/**
 * Links "Inceptions" — espaço para experimentos, forks ou versões do próprio site.
 */
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

/**
 * Coleção de links úteis da NASA para reforçar a procedência dos dados.
 * Inclui a página das APIs e o site oficial (mais LinkedIn institucional).
 */
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

/**
 * Componente de rodapé com múltiplas colunas.
 *
 * Características:
 * - Branding com <Logo /> e descrição curta do projeto.
 * - Três colunas de links: trabalhos pessoais, inceptions e recursos da NASA.
 * - Seção inferior com copyright e atribuição da fonte de dados.
 *
 * Boas práticas:
 * - Os links abrem em nova aba (`target="_blank"`) e usam `rel="noopener noreferrer"`.
 * - Layout responsivo: empilhado no mobile, colunar em telas médias+.
 * - Cores adaptadas ao tema claro/escuro (dark mode).
 */
export default function MultiColumns() {
  return (
    <footer className="mt-28 bg-slate-50 dark:bg-black">
      {/* Conteúdo principal do footer (colunas) */}
      <div className="container mx-auto flex flex-col items-start space-y-12 px-8 pb-8 pt-12 md:flex-row md:space-y-0 md:space-x-12 md:px-12">
        {/* Branding + descrição */}
        <div className="flex w-full flex-col space-y-4 text-center md:w-2/5 md:text-left">
          <Logo />
          <p className="text-sm text-slate-600">
            UniverseEx uma galeria de procura de fotos de Rovers de Marte.
          </p>
        </div>

        {/* Coluna: My Work */}
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

        {/* Coluna: Inceptions (placeholder para estudos/variações do site) */}
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

        {/* Coluna: Links da NASA (fonte dos dados) */}
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

      {/* Barra inferior com direitos autorais e atribuição da API */}
      <div className="container mx-auto border-t border-slate-200 p-8 text-center text-sm text-slate-600 dark:border-slate-900 md:flex-row md:px-12">
        &copy; {new Date().getFullYear()} UniverseEx . Data from NASA Mars Rover Photos API.
      </div>
    </footer>
  );
}
