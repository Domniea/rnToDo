import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { UserContext } from '../../context/UserProvider'

import { signUp } from 'aws-amplify/auth'

const CreateAccount = () => {

    const navigation = useNavigation()
    
    const {
        control,
        handleSubmit,
        watch
    } = useForm()

    const pwd = watch('password')
    console.log(pwd)
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const {height} = useWindowDimensions()
   
    // function onSignUp(data) {
    //     console.log('Registered')
    //     console.log(data)
    //     navigation.navigate('ConfirmEmail')
    // }
    async function handleSignUp({ username, password, email }) {
        try {
          const { isSignUpComplete, userId, nextStep } = await signUp({
            username,
            password,
            options: {
              userAttributes: {
                email
              },
              // optional
              autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
            }
          });
        //   console.log(userId);
          navigation.navigate('ConfirmEmail', {userId, username})
          
        } catch (error) {
          console.log('error signing up:', error);
        }
      }

    function onBacktoSignIn() {
        console.log('On back to sign in')
        navigation.navigate('SignIn')
    }

  return (
    <View style={styles.root}>
        <Text style={styles.header}>Create Account</Text>

        <CustomInput 
            name= 'username'
            placeholder='username' 
            control={control}
            rules={{
                required: 'Username is REQUIRED',
                minLength: {
                    value: 8,
                    message: 'Minimum 8 characters'   
                },
                maxLength: {
                    value: 15,
                    message: 'Maximum 15 characters'
                }
            }}
        />
        <CustomInput 
            name='email'
            placeholder='Email'
            control={control}
            rules={{
                required: 'Email is REQUIRED',
                pattern: {
                    value: EMAIL_REGEX,
                    message: 'Email is invalid'
                },
                maxLength: {
                    value: 24,
                    message: 'Maimum 24 characters'
                }
            }}
        />
        <CustomInput 
            name='password'
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
            name='passwordRetyped'
            placeholder='re-type password'
            control={control}
            rules={{
                required: 'Passwords do not match',
                validate: value => value === pwd || 'Passwords do not match'
            }}
           
        />

        <CustomButton 
            text='Register'
            onPress={handleSubmit(handleSignUp)}
        />

        <Text style={styles.text}>
            By registering you agree to out{' '}
            <Text style={styles.link}>Terms of Use</Text> and 
            <Text style={styles.link}>Privicy Policy</Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton 
        text="Already have an account?"
        onPress={onBacktoSignIn}
        type='TERTIARY'
         />
    </View>
  )
}

export default CreateAccount

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