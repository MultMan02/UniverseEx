'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  page: number;
  hasNext: boolean;
}

export default function Pagination({ page, hasNext }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  function go(to: number) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(to));
    router.push(url.pathname + '?' + url.searchParams.toString());
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        className="rounded-md border border-neutral-700 px-3 py-1.5 disabled:opacity-40"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>
      <span className="text-sm text-neutral-400">Page {page}</span>
      <button
        className="rounded-md border border-neutral-700 px-3 py-1.5 disabled:opacity-40"
        onClick={() => go(page + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
