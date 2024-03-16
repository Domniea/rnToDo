import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { trigger} from 'react-native-haptic-feedback'

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

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false
    }

    const fireHaptic = () => {
      console.log('Haptic Working')
        trigger("impactMedium", options)
    }

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
        onPressIn={fireHaptic}
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
        borderRadius: 150
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