import { Appearance, StyleSheet, Text, View, useColorScheme} from 'react-native'
import React from 'react'
import { useState, useEffect, createContext } from 'react'

const ThemeContext = createContext()

function ThemeProvider(props) {
 
    const colorScheme = useColorScheme()
    
    const [theme, setTheme] = useState(false)
    
    function getTheme() {
        colorScheme === 'light' ? false : true
    }

    useEffect(() => {
        getTheme()
    }, [])

    useEffect(() => {
        const subscription = Appearance.addChangeListener((theme) => {
            theme.colorScheme === "dark" ? setTheme(false) : setTheme(true)
        })

        return () => subscription.remove()
    }, [])

    // function changeTheme() {
    //     setTheme('light' ? 'dark' : 'light')
    // }

    function changeTheme() {
        // if(theme === 'dark') {
        //     setTheme('light')
        //     // Appearance.setColorScheme('light')
        // }
        // else {
        //     setTheme('dark')
        //     // Appearance.setColorScheme('dark')
        // }
        setTheme( theme === false ? true : false)
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                changeTheme
            }}
        >
            {props.children}
        </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider } 

// const styles = StyleSheet.create({})