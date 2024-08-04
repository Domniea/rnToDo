import {
  StyleSheet, 
  Text, 
  View,
  Button
} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from '@react-navigation/native'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

import { ListsContext } from '../../context/ListsProvider'


const CreateList = ({route, navigation}) => {

  const {
    test,
    lists,
    homeList,
    setHomeList,
    setLists,
    getUsersLists,
  } = useContext(ListsContext)


  const { control, handleSubmit } = useForm()

  const { colors } = useTheme()

  //Create List
  async function createList(data) {
    try {
      setHomeList(data.newListTitle)
        setLists(prevState => {
          return [
            ...prevState,
            { list: data.newListTitle, data: []}
          ]
        })
        navigation.navigate('Lists')
    }
    catch(error) {
    console.log(error)
    }
}


  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: colors.text}]}>Create A List!</Text>
      <CustomInput 
        name='newListTitle'
        placeholder='Name your list'
        control={control}
        rules={{
          required: 'List Name is required',
          validate: (value) => {
            if (value && value.length >= 16) {
              // this will give you the correct value for your error message
              return `Please, enter a List Name with less than 30 characters (${value.length}/16)`;
            }
          }
        }}
      keyboardType="default"
      />
       <CustomButton 
          text='Submit'
          onPress={handleSubmit(createList)}
          
        />
  
    </View>
  )
}

export default CreateList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%'
  },
  text: {
    fontSize: 40
  }
})