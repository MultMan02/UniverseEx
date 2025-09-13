import Filters from '@/components/Filters';
import Gallery from '@/components/Gallery';
import Pagination from '@/components/Pagination';
import { isCameraForRover, type MarsPhoto, type Rover } from '@/lib/nasa';

// Endpoint base de fotos dos Rovers (NASA)
const API = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

// Regras de data (UX defensiva / consistência de dataset)
const MIN_DATE = '2012-01-01';
const DEFAULT_DATE = '2015-05-30'; // data padrão amigável à API/dataset
const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Garante que a data esteja no formato YYYY-MM-DD
 * e dentro do intervalo permitido [MIN_DATE, TODAY].
 *
 * @param {string | null | undefined} d - Data candidata vinda da URL.
 * @returns {string} Data corrigida (“clamped”) e válida.
 */
function clampDate(d?: string | null): string {
  // aceita apenas YYYY-MM-DD
  const chosen = d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : DEFAULT_DATE;
  if (chosen < MIN_DATE) return MIN_DATE;
  if (chosen > TODAY) return TODAY;
  return chosen;
}

/**
 * Busca fotos da NASA de acordo com filtros e paginação.
 *
 * Observações:
 * - Usa `revalidate: 3600` para cache incremental de 1h (otimizando chamadas).
 * - Aplica filtro textual opcional `q` (sobre nomes de rover e câmera).
 *
 * @param {Object} params
 * @param {Rover} params.rover         - Rover selecionado (curiosity|opportunity|spirit).
 * @param {string} params.date         - Data terrestre (YYYY-MM-DD).
 * @param {string} [params.camera]     - Código da câmera (ex.: NAVCAM). Opcional.
 * @param {number} params.page         - Página 1..N.
 * @param {string|null} [params.q]     - Termo de busca livre (rover/câmera).
 * @returns {Promise<MarsPhoto[]>} Lista de fotos.
 * @throws {Error} Em falhas HTTP.
 */
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
  // Usa a variável de ambiente se existir; senão, DEMO_KEY (rate limitado)
  url.searchParams.set('api_key', process.env.NASA_API_KEY || 'DEMO_KEY');

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`NASA API error: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as { photos: MarsPhoto[] };

  // Busca textual opcional (UX): filtra por rover/câmera
  const filtered = (q ? data.photos.filter(p =>
    p.rover.name.toLowerCase().includes(q.toLowerCase()) ||
    p.camera.name.toLowerCase().includes(q.toLowerCase()) ||
    p.camera.full_name.toLowerCase().includes(q.toLowerCase())
  ) : data.photos);

  return filtered;
}

/**
 * Página principal da galeria.
 *
 * Notas (Next.js 15):
 * - `searchParams` é uma *Promise*, então o componente é assíncrono (server/edge).
 * - Mantemos um helper `pick` para normalizar string|string[] vindos da URL.
 * - A paginação assume `hasNext` quando retornam >= 25 itens (heurística).
 *
 * @param {{ searchParams: Promise<Record<string, string | string[] | undefined>> }} props
 */
export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Converte a Promise de searchParams (Next.js 15) em objeto simples
  const sp = await props.searchParams;

  // Helper para normalizar valores vindos como string|string[]
  const pick = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  // Lê filtros/página da URL com fallbacks seguros
  const rover = (pick(sp.rover) ?? 'curiosity') as Rover;
  const date = clampDate(pick(sp.date) ?? null);
  const camera = pick(sp.camera);
  const page = Number(pick(sp.page) ?? '1');
  const q = pick(sp.q) ?? null;

  // (Opcional) validação leve de câmera vs rover — pode ser útil:
  // if (camera && !isCameraForRover(rover, camera)) { ... }

  // Chama a NASA API conforme filtros
  const photos = await fetchPhotos({ rover, date, camera, page, q });

  // Heurística: se vieram 25 fotos (page size típico), supomos que exista próxima página
  const hasNext = photos.length >= 25;

  return (
    <div className="space-y-6">
      {/* Filtros no topo da página principal (também aparecem no header em desktop ao rolar) */}
      <Filters />

      {/* Galeria de cards com metadados essenciais (rover/câmera/data) */}
      <Gallery photos={photos} />

      {/* Paginação simples Prev/Next baseada em `hasNext` */}
      <Pagination page={page} hasNext={hasNext} />
    </div>
  );
}
