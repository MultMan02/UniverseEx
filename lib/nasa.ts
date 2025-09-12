export type Rover = 'curiosity' | 'opportunity' | 'spirit';
export type Camera =
  | 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI'
  | 'NAVCAM' | 'PANCAM' | 'MINITES';

export const camerasByRover: Record<Rover, Camera[]> = {
  curiosity: ['FHAZ','RHAZ','MAST','CHEMCAM','MAHLI','MARDI','NAVCAM'],
  opportunity: ['FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'],
  spirit: ['FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'],
};

export function isCameraForRover(rover: Rover, cam: string): cam is Camera {
  return (camerasByRover[rover] as string[]).includes(cam);
}

export interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  rover: { name: string };
  camera: { name: string; full_name: string };
}
