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

const defaultTheme: Theme = {
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

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const setTheme = (name: ThemeName) => {
    setThemeState({
      id: name,
      name:
        name === 'light' ? 'Светлая' : name === 'dark' ? 'Темная' : 'Системная',
      colors: defaultTheme.colors,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
