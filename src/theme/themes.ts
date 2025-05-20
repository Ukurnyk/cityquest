export interface Theme {
  name: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
    muted: string;
  };
  mapStyle?: any;
  tileUrl?: string;
}

export const themes: Record<string, Theme> = {
  classic: {
    name: 'Классика',
    colors: {
      primary: '#4B6CFF',
      accent: '#FF6B4A',
      background: '#F7F8FA',
      card: '#FFFFFF',
      text: '#2B2D42',
      muted: '#7B7F9E',
    },
    mapStyle: [], // стандартный стиль карты
    tileUrl: undefined,
  },
  medieval: {
    name: 'Средневековье',
    colors: {
      primary: '#7B4F1D',
      accent: '#C19A6B',
      background: '#F3E9DC',
      card: '#E5C07B',
      text: '#3E2723',
      muted: '#A1887F',
    },
    mapStyle: require('./medieval-map-style.json'), // если нужен json-стиль
    tileUrl:
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', // пример "темного" средневекового тайлсервера
  },
};
