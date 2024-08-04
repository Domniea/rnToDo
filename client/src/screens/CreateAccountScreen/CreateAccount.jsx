import { 
        View,
        Text,
        StyleSheet,
        useWindowDimensions,
        TouchableWithoutFeedback,
        TouchableOpacity,
        Keyboard,
        SafeAreaView,
        ScrollView,
        Linking,
    } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer'
import { UserContext } from '../../context/UserProvider'

import { signUp, signInWithRedirect} from 'aws-amplify/auth'

const CreateAccount = () => {

    const navigation = useNavigation()
    
    const {
        control,
        handleSubmit,
        watch
    } = useForm()

    const pwd = watch('password')
  
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
   
    async function handleSignUp({ username, password, email }) {
        try {
          const { userId } = await signUp({
            username,
            password,
            options: {
              userAttributes: {
                email
              },
              autoSignIn: true
            },
          });

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
    <KeyboardAvoidingContainer>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            {/* <ScrollView showsVerticalScrollIndicator={false}> */}

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
                        keyboardType='email-address'
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
                        password={true}
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
                        placeholder='Please re-type password'
                        password={true}
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
                        By registering you agree to our{' '}
                        <TouchableOpacity 
                            style={styles.link}
                            onPress={() => Linking.openURL('https://privacy-central.securiti.ai/#/notices/f18400b2-4646-4961-9011-3944801e505f')}
                        >
                            <Text style={styles.link}>
                                Privicy Policy
                            </Text>
                        </TouchableOpacity>
                    </Text>

                    <SocialSignInButtons 
                        onPressGoogle={() => signInWithRedirect({provider: 'Google'})} 
                        onPressFacebook={() => signInWithRedirect({provider: 'Facebook'})} 
                        onPressApple={() => signInWithRedirect({provider: 'Apple'})}
                        onPressAmazon={() => signInWithRedirect({provider: 'Amazon'})} 
                    />
                       
                    <CustomButton 
                    text="Already have an account?"
                    onPress={onBacktoSignIn}
                    type='TERTIARY'
                    /> 
                </View>
{/* 
            </ScrollView> */}

        </TouchableWithoutFeedback>
        
    </KeyboardAvoidingContainer>
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
        margin: 20,
        color: 'white',
    },
    text: {
        color: 'gray',
        marginVertical: 10,
        justifyContent: 'center'
    },
    link: {
        color: '#FDB075'
    }
})