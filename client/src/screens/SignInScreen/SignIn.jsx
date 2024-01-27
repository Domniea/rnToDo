import { 
    View, 
    Text,
    Image,
    StyleSheet, 
    useWindowDimensions,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView
} from 'react-native'

import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import Logo from '../../../assets/logo.png'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'


import { signOut, signIn, signInWithRedirect } from 'aws-amplify/auth'
import { getCurrentUser } from 'aws-amplify/auth';

const SignIn = () => {

    const [errMessage, setErrMessage] = useState('')
    const navigation = useNavigation()

    const {height} = useWindowDimensions()

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm()

    async function currentAuthenticatedUser() {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails}`);
        
      } catch (err) {
        console.log(err);
      }
    }

    async function onPressSignIn(data) {
        try {
          const response = await signIn(data);
          console.log(response)

        } catch (error) {
          console.log('error signing in', error);
          setErrMessage(error.message)
        }
    }

    async function onPressSignOut() {
        try{
            await signOut()
        }
        catch(error) {
            console.log('error: ', error)
        }
    }

    function onForgotPassword() {
        console.log('Forgot Password')
        navigation.navigate('ForgotPassword')
    }

    function onCreateAccount() {
        navigation.navigate('CreateAccount')
    }
    function test() {
        console.log('test')
    }
  return (
    <SafeAreaView>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.root}>
                    <Image 
                        source={Logo}
                        style={[styles.logo, {height: height * 0.3}]}
                        resizeMode='contain'
                    />
                        
                        {
                            errMessage && (
                            <Text style={styles.error}>{errMessage}</Text>
                            )
                        }

                        <CustomInput 
                            placeholder='Username'
                            name='username'
                            control={control}
                            rules={{
                                required: 'Email is REQUIRED',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum 3 characters'
                                },
                                maxLength: {
                                    value: 24,
                                    message: 'Maimum 24 characters'
                                }
                            }}
                            errMessage={errMessage}
                            
                        />
                        <CustomInput 
                            placeholder='Password'
                            name='password'
                            control={control}
                            secureTextEntry
                            rules={{
                                required: 'Password is REQUIRED'
                            }}
                            errMessage={errMessage}
                        />
                       
                    <CustomButton 
                        text='Sign In'
                        onPress={handleSubmit(onPressSignIn)}
                    />
                    <CustomButton 
                        text='Forgot Password'
                        onPress={onForgotPassword}
                        type='TERTIARY'
                    />
                    
                    <SocialSignInButtons 
                        onPressGoogle={() => signInWithRedirect({provider: 'Google'})} 
                        onPressFacebook={() => signInWithRedirect({provider: 'Facebook'})} 
                        onPressAmazon={() => signInWithRedirect({provider: 'Amazon'})} 
                    />

                    <CustomButton 
                    text="Don't have an account? Create on here"
                    onPress={onCreateAccount}
                    type='TERTIARY'
                    />
                </View>

            </ScrollView>

        </TouchableWithoutFeedback>

    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    root: {
        padding: 20,
        alignItems:'center'
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        height: 100
    },
    header: {
        fontSize: 40,
        margin: 20
    },
    error: {
        color: 'red',
        alignSelf: 'stretch'
      }
})