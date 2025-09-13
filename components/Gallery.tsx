'use client';

import { useState } from 'react';
import type { MarsPhoto } from '@/lib/nasa';
import PhotoModal from '@/components/PhotoModal';

/**
 * Propriedades do componente Gallery.
 * @typedef {Object} GalleryProps
 * @property {MarsPhoto[]} photos - Lista de fotos retornadas pela NASA para renderizar em grade.
 */

/**
 * Componente de galeria responsável por:
 * - Exibir a grade de fotos (com metadados básicos).
 * - Lidar com o estado de seleção de uma foto para abertura do modal (zoom/detalhes).
 *
 * Observações de UX/Arquitetura:
 * - Quando não há resultados (lista vazia), exibe um estado vazio com mensagem e uma imagem ilustrativa.
 * - O modal é controlado localmente (estado `selected`) para manter o acoplamento baixo com o pai.
 * - Cada item da galeria é clicável (cursor-zoom-in) e aplica leve escala em hover.
 *
 * Acessibilidade:
 * - As imagens possuem `alt` significativo com o id da foto.
 * - O modal é montado condicionalmente (apenas quando há foto selecionada) para não poluir a árvore DOM.
 *
 * @param {GalleryProps} props
 */
export default function Gallery({ photos }: { photos: MarsPhoto[] }) {
  // Estado que guarda a foto selecionada para exibição no modal.
  // `null` significa nenhum item selecionado (modal fechado).
  const [selected, setSelected] = useState<MarsPhoto | null>(null);

  // Estado vazio: quando não encontramos fotos para os filtros aplicados.
  if (photos.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-800 p-8 text-center text-neutral-400 flex flex-col items-center">
        {/* Imagem ilustrativa para reforçar visualmente o estado vazio */}
        <img
          src="/images/Rover.png"
          alt="Rover"
          className="mb-1 h-48 w-54 lg:w-64 lg:h-64 object-contain"
        />
        Não foram encontradas fotos para os filtros selecionados.
      </div>
    );
  }

  return (
    <>
      {/* Grade responsiva: 1 coluna no mobile, 2 no sm, 3 no lg */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => (
          <li
            key={p.id}
            // Cartão da foto com foco em interatividade e feedback visual
            className="group cursor-zoom-in overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition hover:border-neutral-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
            onClick={() => setSelected(p)} // Ao clicar, abrimos o modal com a foto
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img_src}
                alt={`Mars photo ${p.id}`}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>

            {/* Metadados essenciais: Rover, Câmera (nome completo e abreviação), Data terrestre */}
            <div className="p-3 text-sm">
              <div className="font-medium text-sky-400">{p.rover.name}</div>
              <div className="text-neutral-400">
                {p.camera.full_name}
                {/* Mostra o código curto da câmera apenas se for diferente do nome completo */}
                {p.camera.full_name !== p.camera.name && ` (${p.camera.name})`}
              </div>
              <div className="text-neutral-400">Data da Terra: {p.earth_date}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de detalhes da foto selecionada.
         - Fechamento: clique no backdrop, botão "Fechar" ou tecla ESC.
         - onClose limpa o estado de seleção. */}
      <PhotoModal photo={selected} onClose={() => setSelected(null)} />
    </>
  );
}
