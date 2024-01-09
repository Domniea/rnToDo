import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { UserContext } from '../../context/UserProvider'
import CustomButton from '../CustomButton'

const SocialSignInButtons = () => {

    const {
        onGoogle,
        onFacebook,
        onApple
    }= useContext(UserContext)

  return (
    <>
        <CustomButton 
            text='Sign in with Google'
            onPress={onGoogle}
            bgColor='#E7EAF4'
            fgColor='#4765A9'
        />
        <CustomButton 
            text='Sign in with Facebook'
            onPress={onFacebook}
            bgColor='#FAE9EA'
            fgColor='#DD4D44'
        />
        <CustomButton 
            text='Sign in with Apple'
            onPress={onApple}
            bgColor='#e3e3e3'
            fgColor='#363636'
        />
    </>
  )
}

export default SocialSignInButtons