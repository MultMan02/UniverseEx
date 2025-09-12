import Filters from '@/components/Filters';
import Gallery from '@/components/Gallery';
import Pagination from '@/components/Pagination';
import { isCameraForRover, type MarsPhoto, type Rover } from '@/lib/nasa';

const API = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

const MIN_DATE = '2012-01-01';
const DEFAULT_DATE = '2015-05-30'; // Default 1000 mars sol date
const TODAY = new Date().toISOString().slice(0, 10);

function clampDate(d?: string | null): string {
  // accept YYYY-MM-DD only;
  const chosen = d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : DEFAULT_DATE;
  if (chosen < MIN_DATE) return MIN_DATE;
  if (chosen > TODAY) return TODAY;
  return chosen;
}

async function fetchPhotos({
  rover, date, camera, page, q
}: {
  rover: Rover;
  date: string;
  camera?: string;
  page: number;
  q?: string | null;
}) {
  const url = new URL(`${API}/${rover}/photos`);
  url.searchParams.set('earth_date', date);
  if (camera) url.searchParams.set('camera', camera);
  url.searchParams.set('page', String(page));
  url.searchParams.set('api_key', process.env.NASA_API_KEY || 'DEMO_KEY');

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`NASA API error: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as { photos: MarsPhoto[] };

  // Optional text search over rover/camera names (client requested)
  const filtered = (q ? data.photos.filter(p =>
    p.rover.name.toLowerCase().includes(q.toLowerCase()) ||
    p.camera.name.toLowerCase().includes(q.toLowerCase()) ||
    p.camera.full_name.toLowerCase().includes(q.toLowerCase())
  ) : data.photos);

  return filtered;
}

// ✅ Next.js 15: searchParams é Promise — componente assíncrono + await
export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await props.searchParams;

  // Helpers para lidar com string | string[]
  const pick = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const rover = (pick(sp.rover) ?? 'curiosity') as Rover;
  const date = clampDate(pick(sp.date) ?? null);
  const camera = pick(sp.camera);
  const page = Number(pick(sp.page) ?? '1');
  const q = pick(sp.q) ?? null;

  const photos = await fetchPhotos({ rover, date, camera, page, q });

  // Heuristic: if we got 25 photos (typical page size), assume there might be a next page
  const hasNext = photos.length >= 25;

  return (
    <div className="space-y-6">
      <Filters />
      <Gallery photos={photos} />
      <Pagination page={page} hasNext={hasNext} />
    </div>
  );
}
