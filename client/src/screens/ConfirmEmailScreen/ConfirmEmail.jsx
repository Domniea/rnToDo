import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

import { UserContext } from '../../context/UserProvider'

const ConfirmEmail = () => {

    const navigation = useNavigation()

    const {
        control,
        handleSubmit
    } = useForm()

    const {height} = useWindowDimensions()

    function onRegisterPress() {
        console.log('Registered')
        navigation.navigate('Home')
    }

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
        <Text style={styles.header}>Confirm Your Email</Text>

        <CustomInput 
            name='confirmationEmailCode'
            placeholder='Enter conformation code'
            control={control}
            rules={{
                required: 'Confirmation code is REQUIRED'
            }}
        />

        <CustomButton 
            text='Confirm'
            onPress={handleSubmit(onRegisterPress)}
        />
        <CustomButton 
        text="Resend Code"
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

export default ConfirmEmail

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