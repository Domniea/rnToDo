import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { UserContext } from '../../context/UserProvider'

const ForgotPassword = () => {

    const navigation = useNavigation()  
    
    const {
        control,
        handleSubmit
    } = useForm()

    const {height} = useWindowDimensions()

    function onForgotPasswordSubmit() {
        console.log('Forgot Password Submited')
        navigation.navigate('ResetPassword')
    }

    function onBacktoSignIn() {
        console.log('On back to sign in')
        navigation.navigate('SignIn')
    }

  return (
    <View style={styles.root}>
        <Text style={styles.header}>Forgot Your Password?</Text>

        <CustomInput 
            name='email'
            placeholder='Email'
            control={control}
            rule={{
                requiered: 'Email is REQUIRED'
            }}
        />
        
        <CustomButton 
            text='Submit'
            onPress={handleSubmit(onForgotPasswordSubmit)}
        />
        <CustomButton 
        text="Back to sign in"
        onPress={onBacktoSignIn}
        type='TERTIARY'
         />
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    root: {
        padding: 20,
        alignItems:'center'
    },
    header: {
        fontSize: 40,
        margin: 20
    },
    text: {
        color: 'gray',
        marginVertical: 10
    },
    link: {
        color: '#FDB075'
    }
})