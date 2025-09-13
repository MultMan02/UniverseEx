"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Rover, Camera } from '@/lib/nasa';
import { camerasByRover } from '@/lib/nasa';

/**
 * DATA MIN/MAX do dataset (heurística/limite de UX)
 * MIN_DATE: antes de 2012 pode não haver resultados consistentes
 * DEFAULT_DATE: data padrão para popular a UI quando não há `date` na URL
 */
const MIN_DATE = '2012-01-01';
const DEFAULT_DATE = '2015-05-30';
const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Componente de filtros que:
 * - Lê e escreve parâmetros de busca na URL (querystring).
 * - Reseta a paginação ao alterar qualquer filtro (melhor UX).
 * - Aplica "clamp" de data no cliente para evitar datas fora do range (UX defensiva).
 *
 * Parâmetros suportados na URL:
 * - `rover`  : "curiosity" | "opportunity" | "spirit" (default: curiosity)
 * - `camera` : código de câmera válido para o rover selecionado (ou vazio para todas)
 * - `date`   : data terrestre (YYYY-MM-DD) — clamp entre MIN_DATE e TODAY
 * - `q`      : termo de pesquisa livre (rover/câmera)
 *
 * Acessibilidade:
 * - Cada campo tem `label` associado e hierarquia visual clara.
 */
export default function Filters() {
  const params = useSearchParams();
  const router = useRouter();

  // Lê valores atuais da URL com fallbacks seguros
  const rover = (params.get('rover') ?? 'curiosity') as Rover;
  const camera = (params.get('camera') ?? '') as Camera | '';
  const dateParam = params.get('date'); // pode ser null se não definido

  // Se `date` não estiver presente, usamos a DEFAULT_DATE para manter a UI preenchida
  const date = dateParam ?? DEFAULT_DATE;

  // Deriva as opções de câmera com base no rover selecionado (memo para evitar recomputação)
  const cameraOptions = useMemo(() => camerasByRover[rover], [rover]);

  /**
   * Atualiza a URL com um par chave/valor.
   * - Se `value` for vazio, remove o parâmetro.
   * - Sempre remove `page` para resetar a paginação ao trocar filtros ou busca.
   * - Usa `router.push` para navegação client-side sem recarregar a página.
   *
   * @param {string} key - Nome do parâmetro de consulta (querystring).
   * @param {string} value - Valor a ser aplicado; se string vazia, o param é removido.
   */
  function update(key: string, value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);

    // Importante: resetar paginação toda vez que mudar filtro/busca
    url.searchParams.delete('page');

    // Navega para a nova URL preservando path atual
    router.push(url.pathname + '?' + url.searchParams.toString());
  }

  /**
   * Atualiza a data mantendo-a dentro do intervalo permitido [MIN_DATE, TODAY].
   * Isso evita estados inválidos e dá feedback imediato ao usuário.
   *
   * @param {string} next - Próxima data (YYYY-MM-DD) de acordo com o input.
   */
  function updateDate(next: string) {
    // Clamp defensivo no cliente para UX (o backend também deve validar)
    const clamped =
      next < MIN_DATE ? MIN_DATE :
      next > TODAY    ? TODAY    :
      next;
    update('date', clamped);
  }

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-neutral-900/40 border border-neutral-800 rounded-xl p-4"
      onSubmit={(e) => e.preventDefault()} // evita reload em Enter
    >
      {/* Rover */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-sky-400">Rover</label>
        <select
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 h-10"
          value={rover}
          onChange={(e) => update('rover', e.target.value)}
        >
          {/* Valores suportados (mantidos em minúsculas para consistência com a API/URL) */}
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>
      </div>

      {/* Camera */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-sky-400">Camera</label>
        <select
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 h-10"
          value={camera}
          onChange={(e) => update('camera', e.target.value)}
        >
          <option value="">All cameras</option>
          {/* Lista gerada conforme o rover escolhido */}
          {cameraOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Date (limitada por MIN_DATE/TODAY) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-sky-400">Data da Terra</label>
        <input
          type="date"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 h-10"
          value={date}
          min={MIN_DATE}
          max={TODAY}
          onChange={(e) => updateDate(e.target.value)}
        />
      </div>

      {/* Search (livre) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-sky-400">Pesquisar (Rover ou Camera)</label>
        <input
          type="text"
          placeholder="e.g., Curiosity, NAVCAM"
          defaultValue={params.get('q') ?? ''}
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 h-10"
          onKeyDown={(e) => {
            // Aplica busca ao pressionar Enter (sem recarregar a página)
            if (e.key === 'Enter') {
              const target = e.target as HTMLInputElement;
              update('q', target.value);
            }
          }}
        />
      </div>
    </form>
  );
}
