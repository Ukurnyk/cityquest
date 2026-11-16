// Основные цвета Questly
const primaryLight = '#6C5CE7';
const primaryDark = '#A29BFE';

const Colors = {
  light: {
    text: '#2D3436',
    textSecondary: '#636E72',
    background: '#FFFFFF',
    card: '#F8F9FA',
    // Фон карточек поверх background
    surface: '#FFFFFF',
    tint: primaryLight,
    tabIconDefault: '#B2BEC3',
    tabIconSelected: primaryLight,
    success: '#00B894',
    warning: '#FDCB6E',
    error: '#D63031',
    border: '#DFE6E9',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#B2BEC3',
    background: '#1A1A2E',
    card: '#16213E',
    // Фон карточек поверх background
    surface: '#16213E',
    tint: primaryDark,
    tabIconDefault: '#636E72',
    tabIconSelected: primaryDark,
    success: '#00B894',
    warning: '#FDCB6E',
    error: '#FF6B6B',
    border: '#2D3436',
  },
  // Цвета редкости достижений
  rarity: {
    common: '#78909C',
    rare: '#42A5F5',
    epic: '#AB47BC',
    legendary: '#FFB300',
  },
  // Цвета категорий мест
  category: {
    museum: '#FF7675',
    cafe: '#FDCB6E',
    park: '#00B894',
    landmark: '#6C5CE7',
    event: '#E84393',
  },
};

export type ThemeColors = typeof Colors.light;

export default Colors;
