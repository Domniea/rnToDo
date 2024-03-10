import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from '@react-navigation/native'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const CreateList = () => {

  const {control, handleSubmit} = useForm()

  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: colors.text}]}>CreateList</Text>
      <CustomInput 
        name='newListTitle'
        placeholder='Name your list'
        control={control}
      />
      <CustomButton 
        text='Submit'
      />
    </View>
  )
}

export default CreateList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    // color: 'white',
    fontSize: 40
  }
})