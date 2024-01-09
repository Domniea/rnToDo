import { View, Text, StyleSheet, useWindowDimensions, Alert } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'


import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { UserContext } from '../../context/UserProvider'

const ResetPassword = () => {

    const navigation = useNavigation()

    const {
        control,
        handleSubmit
    } = useForm()

    const {height} = useWindowDimensions()

    function onResendCode() {
        console.log('Code re-sent')
        Alert.alert("Resent Code.")
    }

    function onBacktoSignIn() {
        console.log('On back to sign in')
        navigation.navigate('SignIn')
    }

  return (
    <View style={styles.root}>
        <Text style={styles.header}>Reset Your Password</Text>

        <CustomInput 
            name='newPassword'
            placeholder='Password'
            control={control}
            rules={{
                required: 'Password is REQUIRED',
                minLength: {
                    value: 8,
                    message: 'minimum 8 characters'
                },
                maxLength: {
                    value: 15,
                    message: 'Maximum 15 characters'
                }
            }}
        />

        <CustomInput 
            name='newPasswordRetyped'
            placeholder='re-type password'
            control={control}
            rules={{
                required: 'Password is REQUIRED',
                minLength: {
                    value: 8,
                    message: 'minimum 8 characters'
                },
                maxLength: {
                    value: 15,
                    message: 'Maximum 15 characters'
                }
            }}
        />

        <CustomButton 
            text='Submit'
            onPress={handleSubmit(onBacktoSignIn)}
        />
         <CustomButton 
            text='Resend Code'
            onPress={onResendCode}
            type='SECONDARY'
        />
        <CustomButton 
        text="Back to sign in"
        onPress={onBacktoSignIn}
        type='TERTIARY'
         />
    </View>
  )
}

export default ResetPassword

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