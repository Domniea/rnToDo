import { 
    View, 
    Text,
    TextInput,
    Pressable,
    Image,
    StyleSheet, 
    useWindowDimensions,
    ScrollView
} from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'


import Logo from '../../../assets/logo.png'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { UserContext } from '../../context/UserProvider'
import { Button } from '@aws-amplify/ui-react-native/dist/primitives'

import {
    withAuthenticator,
    useAuthenticator
  } from '@aws-amplify/ui-react-native';
import { signOut } from 'aws-amplify/auth'


const SignIn = () => {

    const navigation = useNavigation()

    const {height} = useWindowDimensions()

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm()

    function onSignIn(data) {
        console.log(data)
        navigation.navigate('Home')
    }

    function onForgotPassword() {
        console.log('Forgot Password')
        navigation.navigate('ForgotPassword')
    }

    function onCreateAccount() {
        navigation.navigate('CreateAccount')
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image 
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode='contain'
            />
            <Text style={styles.header}>Sign in Screen</Text>
            <Pressable onPress={signOut}>
                <Text>Sign Out</Text>
            </Pressable>
    
            <CustomInput 
                placeholder='Email'
                name='email'
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
            />
            <CustomInput 
                placeholder='Password'
                name='password'
                control={control}
                secureTextEntry
                rules={{
                    required: 'Password is REQUIRED'
                }}
            />
            
            <CustomButton 
                text='Sign In'
                onPress={handleSubmit(onSignIn)}
            />
            <CustomButton 
                text='Forgot Password'
                onPress={onForgotPassword}
                type='TERTIARY'
            />
        
            <SocialSignInButtons />

            <CustomButton 
            text="Don't have an account? Create on here"
            onPress={onCreateAccount}
            type='TERTIARY'
            />
        </View>
    </ScrollView>
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
    }
})