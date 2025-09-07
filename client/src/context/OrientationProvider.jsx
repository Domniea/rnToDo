import React, { createContext, useState, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';

export const OrientationContext = createContext({
  orientation: 'PORTRAIT',
  windowWidth: 0,
  windowHeight: 0,
});

export function OrientationProvider({ children }) {
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [windowSize, setWindowSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  // Helper to determine orientation from width/height
  const determineOrientation = (width, height) => {
    return width < height ? 'PORTRAIT' : 'LANDSCAPE';
  };

  useEffect(() => {
    // Set initial orientation
    setOrientation(determineOrientation(windowSize.width, windowSize.height));

    // Subscribe to orientation changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowSize({ width: window.width, height: window.height });
      setOrientation(determineOrientation(window.width, window.height));
    });

    return () => subscription?.remove();
  }, []);

  const value = useMemo(
    () => ({
      orientation,
      windowWidth: windowSize.width,
      windowHeight: windowSize.height,
    }),
    [orientation, windowSize]
  );

  return <OrientationContext.Provider value={value}>{children}</OrientationContext.Provider>
}
