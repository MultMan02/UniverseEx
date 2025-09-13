'use client';

import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Propriedades de paginação.
 * @typedef PaginationProps
 * @property {number} page    - Página atual (>= 1).
 * @property {boolean} hasNext - Indica se existe próxima página (para habilitar/desabilitar "Next").
 */
interface Props {
  page: number;
  hasNext: boolean;
}

/**
 * Componente de Paginação simples (Prev / Page N / Next).
 *
 * Comportamento:
 * - Lê os parâmetros atuais da URL (via `useSearchParams`) para preservar filtros.
 * - Atualiza apenas o parâmetro `page` e navega com `router.push`, mantendo demais parâmetros.
 * - Desabilita o botão "Prev" quando `page <= 1` e "Next" quando `!hasNext`.
 *
 * Acessibilidade/UX:
 * - Botões com estados desabilitados evitam navegação inválida.
 * - Mantém consistência de estado via querystring, permitindo linkabilidade/compartilhamento.
 */
export default function Pagination({ page, hasNext }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  /**
   * Navega para a página desejada, preservando os demais parâmetros
   * que possam representar filtros/busca atuais (rover, camera, date, q, etc.).
   * @param {number} to - Número da página destino.
   */
  function go(to: number) {
    // Clona a URL atual para manipular querystring com segurança.
    const url = new URL(window.location.href);

    // Define o novo número de página.
    url.searchParams.set('page', String(to));

    // Dispara navegação client-side (sem recarregar a página).
    router.push(url.pathname + '?' + url.searchParams.toString());
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-2" role="navigation" aria-label="Paginação de resultados">
      <button
        className="rounded-md border border-neutral-700 px-3 py-1.5 disabled:opacity-40"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-disabled={page <= 1}
      >
        Prev
      </button>

      {/* Indicador de página atual. Em implementações futuras, pode-se trocar por "Página X de Y". */}
      <span className="text-sm text-neutral-400" aria-live="polite">Page {page}</span>

      <button
        className="rounded-md border border-neutral-700 px-3 py-1.5 disabled:opacity-40"
        onClick={() => go(page + 1)}
        disabled={!hasNext}
        aria-disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
