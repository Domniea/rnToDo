import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';

export const ThemeContext = createContext({
  theme: 'light',
  switchState: false,
  setTheme: () => {},
  changeTheme: () => {},
  setSwitchState: () => {},
});

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || 'light');
  const [switchState, setSwitchState] = useState(systemColorScheme === 'dark');

  // Toggle theme manually
  const changeTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setSwitchState((prev) => !prev);
  }, []);

  // Sync with system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
      setSwitchState(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      changeTheme,
      switchState,
      setSwitchState,
    }),
    [theme, switchState, changeTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
