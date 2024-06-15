import { KEYS } from '@storage/Keys';
import { PersistenceStorage } from '@storage/index';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

type AvailableThemes = 'light' | 'dark';

interface ThemeContextType {
  theme: AvailableThemes;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<AvailableThemes>('light');

  useEffect(() => {
    const getTheme = () => {
      const savedTheme = PersistenceStorage.getItem(KEYS.THEME);
      if (savedTheme) {
        setTheme(savedTheme as AvailableThemes);
      }
    };

    getTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme: AvailableThemes = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    PersistenceStorage.setItem(KEYS.THEME, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
