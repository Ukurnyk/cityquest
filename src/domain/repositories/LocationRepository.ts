import { Location } from '@/domain/entities/Location';

export interface LocationRepository {
  getLocations(): Promise<Location[]>;
  getLocationById(id: string): Promise<Location | null>;
}
