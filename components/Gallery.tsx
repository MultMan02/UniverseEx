import Image from 'next/image';
import type { MarsPhoto } from '@/lib/nasa';

export default function Gallery({ photos }: { photos: MarsPhoto[] }) {
  if (photos.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-800 p-8 text-center text-neutral-400">
        No photos for the selected filters.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((p) => (
        <li key={p.id} className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="relative aspect-[4/3]">
            {/* Use next/image with unoptimized fallback for external URL */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img_src} alt={`Mars photo ${p.id}`} className="h-full w-full object-cover" />
          </div>
          <div className="p-3 text-sm">
            <div className="font-medium">{p.rover.name}</div>
            <div className="text-neutral-400">{p.camera.full_name} ({p.camera.name})</div>
            <div className="text-neutral-400">Earth date: {p.earth_date}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
