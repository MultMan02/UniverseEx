'use client';

import { useState } from 'react';
import type { MarsPhoto } from '@/lib/nasa';
import PhotoModal from '@/components/PhotoModal';

export default function Gallery({ photos }: { photos: MarsPhoto[] }) {
  const [selected, setSelected] = useState<MarsPhoto | null>(null);

  if (photos.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-800 p-8 text-center text-neutral-400 flex flex-col items-center">
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
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => (
          <li
            key={p.id}
            className="group cursor-zoom-in overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition hover:border-neutral-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
            onClick={() => setSelected(p)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img_src}
                alt={`Mars photo ${p.id}`}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-3 text-sm">
              <div className="font-medium text-sky-400">{p.rover.name}</div>
              <div className="text-neutral-400">
                {p.camera.full_name}
                {p.camera.full_name !== p.camera.name && ` (${p.camera.name})`}
              </div>
              <div className="text-neutral-400">Data da Terra: {p.earth_date}</div>
            </div>
          </li>
        ))}
      </ul>


      {/* Modal */}
      <PhotoModal photo={selected} onClose={() => setSelected(null)} />
    </>
  );
}
