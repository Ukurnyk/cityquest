import React, { createContext, useContext, useState } from 'react';
import { themes } from './themes';

type ThemeName = 'light' | 'dark' | 'system';

export interface Theme {
  id: ThemeName;
  name: string;
  colors: {
    primary: string;
    accent: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    muted: string;
    error: string;
    border: string;
  };
}

interface ThemeContextProps {
  theme: Theme;
  setTheme: (name: ThemeName) => void;
}

const lightTheme: Theme = {
  id: 'light',
  name: 'Светлая',
  colors: {
    primary: '#4B6CFF',
    accent: '#FF6B4A',
    secondary: '#A06EFF',
    background: '#F7F8FA',
    card: '#FFFFFF',
    text: '#2B2D42',
    muted: '#7B7F9E',
    error: '#FF4A4A',
    border: '#E5E7EB',
  },
};

const darkTheme: Theme = {
  id: 'dark',
  name: 'Темная',
  colors: {
    primary: '#6B8CFF',
    accent: '#FF8B6A',
    secondary: '#C08EFF',
    background: '#1A1B1E',
    card: '#2B2D42',
    text: '#F7F8FA',
    muted: '#9B9FBE',
    error: '#FF6A6A',
    border: '#3E3F42',
  },
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(lightTheme);

  const setTheme = (name: ThemeName) => {
    if (name === 'system') {
      // TODO: Добавить определение системной темы
      setThemeState(lightTheme);
      return;
    }

    setThemeState(name === 'light' ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
