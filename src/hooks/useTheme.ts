import { useEffect, useMemo, useState } from 'react';
import type { ThemeMode, ThemePreference } from '../types/theme';

const THEME_STORAGE_KEY = 'pdf-merge-theme';

function getSystemTheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredPreference(): ThemePreference {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemePreference | null;

  if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
    return storedTheme;
  }

  return 'system';
}

export function useTheme() {
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const resolvedTheme = useMemo<ThemeMode>(() => {
    return themePreference === 'system' ? 'dark' : themePreference;
  }, [themePreference]);

  useEffect(() => {
    setThemePreference(getStoredPreference());
  }, []);

  useEffect(() => {
    if (themePreference !== 'system') {
      document.documentElement.classList.toggle('dark', themePreference === 'dark');
      window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applySystemTheme = () => {
      document.documentElement.classList.toggle('dark', getSystemTheme() === 'dark');
    };

    applySystemTheme();
    window.localStorage.setItem(THEME_STORAGE_KEY, 'system');
    mediaQuery.addEventListener('change', applySystemTheme);

    return () => {
      mediaQuery.removeEventListener('change', applySystemTheme);
    };
  }, [themePreference]);

  useEffect(() => {
    if (themePreference === 'system') {
      return;
    }

    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme, themePreference]);

  return {
    themePreference,
    resolvedTheme,
    setThemePreference,
  };
}
