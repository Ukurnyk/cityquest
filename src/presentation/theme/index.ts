export const theme = {
  colors: {
    primary: '#4B6CFF',
    accent: '#FF6B4A',
    secondary: '#A06EFF',
    background: '#F7F8FA',
    card: '#FFFFFF',
    text: '#2B2D42',
    muted: '#7B7F9E',
    error: '#FF4A4A',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: '700',
    },
    h2: {
      fontSize: 20,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
    },
    small: {
      fontSize: 14,
      fontWeight: '400',
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  },
} as const;
