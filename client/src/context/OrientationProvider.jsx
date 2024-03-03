import React, {createContext, useState, useEffect} from "react";
import {
    useWindowDimensions,
    Dimensions
} from "react-native"; 

const OrientationContext = createContext()

const OrientationProvider = (props) => {
    const [orientation, setOrientation] = useState('PORTRAIT');

    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
   

    const determineAndSetOrientation = () => {
        if (width < height) {
            setOrientation('PORTRAIT');
          } else {
            setOrientation('LANDSCAPE');
          }
      }

    useEffect(() => {
        Dimensions.addEventListener('change', ({window: {width, height}}) => {
            if (width < height) {
            setOrientation('PORTRAIT');
            } else {
            setOrientation('LANDSCAPE');
            }
        });
    }, []);
  
    return (
      <OrientationContext.Provider 
        style={{flex: 1}} 
        value={{
            orientation,
            windowWidth,
            windowHeight
        }}
        >
        {props.children}
      </OrientationContext.Provider>
    );
  };
  
  export {OrientationContext, OrientationProvider};