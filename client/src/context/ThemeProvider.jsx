import {Appearance, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {useState, useEffect, createContext} from 'react';

const ThemeContext = createContext();

function ThemeProvider(props) {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState(colorScheme);
  const [switchState, setSwitchState] = useState(false);

  function getTheme() {
    colorScheme === 'light' ? 'false' : true;
  }

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(theme => {
      theme.colorScheme === 'dark' ? setTheme(true) : setTheme(false);
    });

    return () => subscription.remove();
  }, []);

  function changeTheme() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
    setSwitchState(prevState => !prevState);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        changeTheme,
        switchState,
        setSwitchState,
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export {ThemeContext, ThemeProvider};
