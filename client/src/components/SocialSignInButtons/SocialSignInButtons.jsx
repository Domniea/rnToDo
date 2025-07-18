import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { UserContext } from '../../context/UserProvider'
import CustomButton from '../CustomButton'

const SocialSignInButtons = (props) => {
    
    const {
        onPressGoogle,
        onPressFacebook,
        onPressApple,
        onPressAmazon
    } = props

  return (
    <>
        <CustomButton 
            text='Sign in with Google'
            onPress={onPressGoogle}
            bgColor='#E7EAF4'
            fgColor='#4765A9'
        />
        <CustomButton 
            text='Sign in with Facebook'
            onPress={onPressFacebook}
            bgColor='#FAE9EA'
            fgColor='#DD4D44'
        />
        <CustomButton 
            text='Sign in with Apple'
            onPress={onPressApple}
            bgColor='#e3e3e3'
            fgColor='#363636'
        />
        <CustomButton 
            text='Sign in with Amazon'
            onPress={onPressAmazon}
            bgColor='#aaaaaa'
            fgColor='#ffffff'
        />
    </>
  )
}

export default SocialSignInButtons