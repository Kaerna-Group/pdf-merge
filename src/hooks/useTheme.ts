import { useEffect, useState } from 'react';
import type { ThemeMode } from '../types/theme';

const THEME_STORAGE_KEY = 'pdf-merge-theme';

function getPreferredTheme(): ThemeMode {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    setTheme(getPreferredTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    toggleTheme,
  };
}
