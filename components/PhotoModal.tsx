'use client';

import { useEffect } from 'react';
import type { MarsPhoto } from '@/lib/nasa';

type Props = {
  photo: MarsPhoto | null;
  onClose: () => void;
};

export default function PhotoModal({ photo, onClose }: Props) {
  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (photo) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [photo]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        // Close when clicking backdrop (but not when clicking the dialog)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Dialog */}
        <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-2xl">
        {/* Close button */}
        <button
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full border border-neutral-700 px-2 py-1 text-neutral-300 hover:bg-neutral-800"
            onClick={onClose}
        >
            ✕
        </button>

        {/* Title */}
        <h2 className="mb-4 pr-10 text-xl font-semibold text-sky-400">
            {photo.rover.name} — {photo.camera.full_name}
        </h2>

        {/* Image with size limit */}
        <div className="mx-auto max-h-[60vh] overflow-hidden rounded-lg border border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
            src={photo.img_src}
            alt={`Mars photo ${photo.id}`}
            className="mx-auto block h-auto max-h-[60vh] w-auto object-contain transition-transform duration-500 ease-out hover:scale-[1.06]"
            />
        </div>

        {/* Meta */}
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

        {/* Actions */}
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
