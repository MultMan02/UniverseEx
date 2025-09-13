"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Filters from "@/components/Filters";

/**
 * Header responsivo e *sticky* com comportamento dinâmico:
 *
 * - Mobile/Tablet (<lg): mostra logo à esquerda e um link para "NASA APIs" à direita.
 * - Desktop (lg+): layout em 3 colunas (Logo | Centro | Nav direita).
 *   - No centro, alterna entre o Título ("Mars Rover Gallery") e os Filtros,
 *     dependendo do scroll:
 *       • Antes de rolar: exibe o Título (foco em branding/contexto).
 *       • Após rolar > 80px: substitui pelo componente <Filters /> (foco em busca/UX).
 *
 * - O header é *sticky* (fixo no topo) com blur e fundo semitransparente,
 *   permitindo que o conteúdo role por baixo mantendo legibilidade.
 *
 * Acessibilidade/UX:
 * - Mantém navegação clara e previsível em todas as larguras.
 * - Filtros ficam rapidamente acessíveis após início da rolagem em desktop.
 */
export default function Header() {
  // Estado que indica se já houve rolagem suficiente para trocar o centro (título -> filtros)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /**
     * Atualiza o estado `scrolled` com base no deslocamento vertical da página.
     * O limiar de 80px dá uma sensação natural de transição.
     */
    const onScroll = () => setScrolled(window.scrollY > 80);

    // Força uma leitura inicial (útil se o usuário recarregar no meio da página).
    onScroll();

    // Listener de scroll (passive para melhor performance)
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup ao desmontar
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur"
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">

        {/* ---------- Mobile / Tablet (<lg): comportamento compacto ---------- */}
        <div className="flex items-center justify-between lg:hidden">
          <Logo />
          <nav className="text-sm text-neutral-400" aria-label="Links institucionais">
            <a className="hover:text-white" href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
              NASA APIs
            </a>
          </nav>
        </div>

        {/* ---------- Desktop (lg+): 3 colunas: esquerda (Logo), centro (Título/Filtros), direita (Nav) ---------- */}
        <div className="hidden lg:flex items-center">
          {/* Esquerda: Logo sempre visível (largura fixa para estabilizar layout) */}
          <div className="w-[160px] shrink-0">
            <Logo />
          </div>

          {/* Centro: alterna Título <-> Filtros conforme scroll (melhor foco de tarefa) */}
          <div className="flex-1 flex justify-center">
            {scrolled ? (
              <div className="w-full max-w-3xl" aria-label="Filtros de busca">
                <Filters />
              </div>
            ) : (
              <h1 className="text-xl font-semibold tracking-wide text-center">
                Mars Rover Gallery
              </h1>
            )}
          </div>

          {/* Direita: navegação auxiliar (link rápido para documentação das APIs da NASA) */}
          <div className="w-[160px] shrink-0 flex items-center justify-end">
            <nav className="text-sm text-neutral-400" aria-label="Links institucionais">
              <a className="hover:text-white" href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
                NASA APIs
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
