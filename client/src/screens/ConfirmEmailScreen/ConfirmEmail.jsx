import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

import { confirmSignUp, autoSignIn, resendSignUpCode } from 'aws-amplify/auth';

const ConfirmEmail = (props) => {
    const {route} = props
    const navigation = useNavigation()
    console.log(route.params.userId, route.params.username)

    const {
        control,
        handleSubmit
    } = useForm()


    async function handleAutoSignIn() {
        try {
            const signInOutput = await autoSignIn()
            console.log('sign in output:', signInOutput)
        }
        catch(error) {
            console.log(error)
        }
    }

    async function handleSignUpConfirmation({ username, confirmationCode }) {
        try {
          const confirmResponse = await confirmSignUp({
            username,
            confirmationCode
          });
          console.log('handle Sign Up Conformation response:', confirmResponse)
          handleAutoSignIn()
        //   setUser({username: username.toLowerCase()})
        navigation.navigate('SignUpComplete', { username })
        } catch (error) {
          console.log('error confirming sign up', error);
        }
      }

    function onResendCode() {
        resendSignUpCode({clientId: route.params.userId, username: route.params.username})
        console.log('RESENT')
    }

  return (
    <View style={styles.root}>

        <Text style={styles.header}>Confirm Your Email</Text>
        <CustomInput 
            name='username'
            placeholder='Username'
            control={control}
            rules={{
                required: 'Confirmation code is REQUIRED'
            }}
        />
        <CustomInput 
            name='confirmationCode'
            placeholder='Enter conformation code'
            control={control}
            rules={{
                required: 'Confirmation code is REQUIRED'
            }}
        />

        <CustomButton 
            text='Confirm'
            onPress={handleSubmit(handleSignUpConfirmation)}
        />
        <CustomButton 
        text="Resend Code"
        onPress={onResendCode}
        type='SECONDARY'
         />
        <CustomButton 
        text="Back to sign in"
        onPress={() => navigation.navigate('SignIn')}
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