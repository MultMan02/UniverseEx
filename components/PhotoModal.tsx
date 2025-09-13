'use client';

import { useEffect } from 'react';
import type { MarsPhoto } from '@/lib/nasa';

/**
 * Propriedades do componente PhotoModal.
 */
type Props = {
  /**
   * Objeto da foto de Marte retornada pela API (ou `null` se não houver foto selecionada).
   * Quando `photo` existe, o modal é exibido; quando `null`, nada é renderizado.
   */
  photo: MarsPhoto | null;
  /**
   * Callback para fechar o modal. Deve ser fornecido pelo componente pai
   * (por exemplo, para limpar o estado de `photo`).
   */
  onClose: () => void;
};

/**
 * Componente de modal para exibir uma foto em destaque com metadados.
 *
 * - Exibe imagem em tamanho controlado, título com Rover e câmera,
 *   e metadados (data na Terra, câmera, rover).
 * - Fecha ao pressionar ESC ou ao clicar no backdrop.
 * - Bloqueia o scroll do `body` enquanto o modal está aberto
 *   para evitar que o conteúdo de fundo role.
 */
export default function PhotoModal({ photo, onClose }: Props) {
  // Efeito: fechar ao pressionar ESC
  // Observa eventos de teclado e fecha se a tecla for "Escape".
  useEffect(() => {
    /**
     * Handler de teclado para fechar ao pressionar ESC.
     */
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    // Cleanup: remove listener quando o componente desmonta ou onClose muda
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Efeito: impedir scroll do body enquanto o modal estiver aberto
  // Salva o valor anterior de overflow e restaura no cleanup.
  useEffect(() => {
    if (photo) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [photo]);

  // Se não existe foto selecionada, não renderiza nada (modal fechado).
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        // Fecha ao clicar no backdrop (área fora do diálogo).
        // Se o clique foi exatamente na camada atual (fundo) e não no conteúdo, fecha.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop com leve blur e escurecimento do fundo */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Container do diálogo */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-2xl">
        {/* Botão de fechar (canto superior direito) */}
        <button
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full border border-neutral-700 px-2 py-1 text-neutral-300 hover:bg-neutral-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Título com nome do Rover e nome completo da câmera */}
        <h2 className="mb-4 pr-10 text-xl font-semibold text-sky-400">
          {photo.rover.name} — {photo.camera.full_name}
        </h2>

        {/* Imagem limitada por altura máxima; usa object-contain para manter proporção */}
        <div className="mx-auto max-h-[60vh] overflow-hidden rounded-lg border border-neutral-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.img_src}
            alt={`Mars photo ${photo.id}`}
            className="mx-auto block h-auto max-h-[60vh] w-auto object-contain transition-transform duration-500 ease-out hover:scale-[1.06]"
          />
        </div>

        {/* Metadados em grid (responsivo) */}
        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <div className="font-semibold text-sky-400">Data da Terra:</div>
            <div className="text-neutral-300">{photo.earth_date}</div>
          </div>
          <div>
            <div className="font-semibold text-sky-400">Câmera:</div>
            <div className="text-neutral-300">{photo.camera.name}</div>
          </div>
          <div>
            <div className="font-semibold text-sky-400">Rover:</div>
            <div className="text-neutral-300">{photo.rover.name}</div>
          </div>
        </div>

        {/* Ações: abrir imagem original em nova aba e fechar */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={photo.img_src}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
          >
            Imagem original
          </a>
          <button
            onClick={onClose}
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
