import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomButton = (props) => {

    const {
        text,
        onPress,
        type='PRIMARY', 
        bgColor,
        fgColor,
        btnWidth,
        btnMargin
        
    } = props

  return (
    <Pressable 
        style={[
            styles.container,
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {},
            btnWidth ? {width: btnWidth} : {width: '100%'},
            btnMargin ? {margin: btnMargin} : {marginVertical: 5}
        ]}
        onPress={onPress}
    >
      <Text  
        style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? {color: fgColor} : {}
        ]}
      >{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 5,
        padding: 15,
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    },
    container_PRIMARY: {
        backgroundColor: '#3b71f3',
    },
    container_SECONDARY: {
        borderColor: '#3b71f3',
        borderWidth: 2
    },
    container_TERTIARY: {
    },
    text_PRIMARY: {
        color: 'white'
    },
    text_SECONDARY: {
        color: '#3b71f3' 
    },
    text_TERTIARY: {
        color: 'gray'
    }
})