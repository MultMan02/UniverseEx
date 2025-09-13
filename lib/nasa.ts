/**
 * Rovers suportados pela Mars Rover Photos API.
 * Mantidos em minúsculas para alinhar com a querystring/URL.
 */
export type Rover = 'curiosity' | 'opportunity' | 'spirit';

/**
 * Câmeras possíveis da API (códigos curtos).
 * Nem todas existem para todos os rovers.
 */
export type Camera =
  | 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI'
  | 'NAVCAM' | 'PANCAM' | 'MINITES';

/**
 * Mapeamento de câmeras válidas por rover.
 * Útil para popular selects e validar filtro de câmera.
 */
export const camerasByRover: Record<Rover, Camera[]> = {
  curiosity: ['FHAZ','RHAZ','MAST','CHEMCAM','MAHLI','MARDI','NAVCAM'],
  opportunity: ['FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'],
  spirit: ['FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'],
};

/**
 * Normaliza um código de câmera para comparação:
 * - remove espaços nas pontas
 * - converte para maiúsculas
 */
function normalizeCamera(cam: string): string {
  return cam.trim().toUpperCase();
}

/**
 * Verifica se `cam` é compatível com o `rover` informado
 * e atua como *type guard* (refina `cam` para `Camera`).
 *
 * Aceita entradas em caixa baixa/alta (p.ex. "navcam").
 */
export function isCameraForRover(rover: Rover, cam: string): cam is Camera {
  const norm = normalizeCamera(cam);
  // como camerasByRover armazena maiúsculas, comparamos norm com a lista:
  return (camerasByRover[rover] as string[]).includes(norm);
}

/**
 * Forma mínima de um item "Photo" retornado pela API da NASA.
 * Inclui apenas os campos usados no app.
 *
 */
export interface MarsPhoto {
  id: number;
  img_src: string;     // URL da imagem
  earth_date: string;  // "YYYY-MM-DD"
  rover: { name: string };
  camera: { name: string; full_name: string };
}
