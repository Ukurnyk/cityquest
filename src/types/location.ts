export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: 'landmark' | 'museum' | 'park' | 'restaurant' | 'shop';
  rating: number;
  images: string[];
  address: string;
}
