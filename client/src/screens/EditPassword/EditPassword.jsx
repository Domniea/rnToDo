import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { updatePassword } from 'aws-amplify/auth'
import { useTheme } from '@react-navigation/native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const EditPassword = () => {

  const { width, height } = useWindowDimensions()

  const { colors } = useTheme()

  const {
    control,
    handleSubmit,
    watch
  } = useForm()

  const pwd = watch('newPassword')

  async function handlePasswordUpdate(data) {
    const oldPassword = data.oldPassword
    const newPassword = data.newPasswordRetyped
    console.log('clicked')
    try {
      await updatePassword({ oldPassword, newPassword })
      console.log('caught')
     
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <View style={height >= 500 ? styles.containerScreen : styles.containerScreenLANDSCAPE}>
      <Text style={[{color: colors.text}, styles.header]} >EditPassword</Text>
      <CustomInput 
        name='oldPassword'
        placeholder='Old Password'
        control={control}
      />
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
                required: 'Passwords do not match',
                validate: value => value === pwd || 'Passwords do not match'
            }}
        />
        <CustomButton text='Submit' onPress={handleSubmit(handlePasswordUpdate)}/>

    </View>
  )
}

export default EditPassword

const styles = StyleSheet.create({
  containerScreen: {
    margin: '10%',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-around'
},
containerScreenLANDSCAPE: {
    marginHorizontal: '10%',
    marginVertical: '2%',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-around'
},
header: {
  margin: '2%',
  fontSize: 35
},
error: {
    color: 'red',
    alignSelf: 'stretch'
  }
})