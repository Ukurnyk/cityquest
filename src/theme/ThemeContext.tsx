import React, { createContext, useContext, useState } from 'react';
import { themes } from './themes';

type ThemeName = keyof typeof themes;

interface ThemeContextProps {
  theme: typeof themes.classic;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: themes.classic,
  themeName: 'classic',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>('classic');
  const setTheme = (name: ThemeName) => setThemeName(name);
  return (
    <ThemeContext.Provider
      value={{ theme: themes[themeName], themeName, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
