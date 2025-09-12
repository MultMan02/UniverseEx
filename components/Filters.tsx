// components/Filters.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Rover, Camera } from '@/lib/nasa';
import { camerasByRover } from '@/lib/nasa';

const MIN_DATE = '2003-01-01';           // “after 2002” → Jan 1, 2003
const TODAY = new Date().toISOString().slice(0, 10);

export default function Filters() {
  const params = useSearchParams();
  const router = useRouter();

  const rover = (params.get('rover') ?? 'curiosity') as Rover;
  const camera = (params.get('camera') ?? '') as Camera | '';
  const dateParam = params.get('date'); // may be null if not set

  const date = dateParam ?? TODAY;

  const cameraOptions = useMemo(() => camerasByRover[rover], [rover]);

  function update(key: string, value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    url.searchParams.delete('page'); // reset pagination on filter change
    router.push(url.pathname + '?' + url.searchParams.toString());
  }

  function updateDate(next: string) {
    // clamp client-side (extra UX safety)
    const clamped =
      next < MIN_DATE ? MIN_DATE :
      next > TODAY    ? TODAY    :
      next;
    update('date', clamped);
  }

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-neutral-900/40 border border-neutral-800 rounded-xl p-4"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Rover */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-400">Rover</label>
        <select
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2"
          value={rover}
          onChange={(e) => update('rover', e.target.value)}
        >
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
        </select>
      </div>

      {/* Camera */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-400">Camera</label>
        <select
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2"
          value={camera}
          onChange={(e) => update('camera', e.target.value)}
        >
          <option value="">All cameras</option>
          {cameraOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Date (limited) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-400">Earth date</label>
        <input
          type="date"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2"
          value={date}
          min={MIN_DATE}
          max={TODAY}
          onChange={(e) => updateDate(e.target.value)}
        />
      </div>

      {/* Search */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-400">Search (Rover or Camera)</label>
        <input
          type="text"
          placeholder="e.g., Curiosity, NAVCAM"
          defaultValue={params.get('q') ?? ''}
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2"
          onKeyDown={(e) => {
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
