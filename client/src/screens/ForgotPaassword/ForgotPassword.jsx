import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { UserContext } from '../../context/UserProvider'

import { resetPassword } from 'aws-amplify/auth'
 


const ForgotPassword = () => {

    const navigation = useNavigation()
    const { colors } =useTheme() 
    
    const {
        control,
        handleSubmit
    } = useForm()

    const {height} = useWindowDimensions()


    function onBacktoSignIn() {
        console.log('On back to sign in')
        navigation.navigate('SignIn')
    }

    async function forgotPassword(data) {
        try{
            console.log(data)
            const response = await resetPassword(data)
            console.log(response)
            // handleNextStep(response)

        }
        catch(error) {
            console.log(error)
        }
    }
    
    async function handleNextStep(output) {
        try{
            const {nextStep} = output
            const deliveredTo = nextStep.codeDeliveryDetails
            if(nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE'){
                console.log(`Code Sent to ${deliveredTo}`)
            }
            else {
                console.log("it didn't work")
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    async function onForgotPasswordSubmit(data) {
        try{
            forgotPassword(data)
            navigation.navigate('ResetPassword', {username: data.username})
        }
        catch(error) {
            console.log(error)
        }
    }

  return (
    <View style={styles.root}>

        <Text style={[styles.header, { color: colors.text}]}>Forgot Your Password?</Text>
        <CustomInput 
            name='username'
            placeholder='Username'
            control={control}
            rule={{
                requiered: 'Username is REQUIRED'
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
        flex: 1,
        padding: 20,
        alignItems:'center',
        justifyContent: 'center'
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