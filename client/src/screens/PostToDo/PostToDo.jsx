import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollViewBase, TouchableWithoutFeedback,Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'


import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'

import { UserContext } from '../../context/UserProvider'
import { ToDoContext } from '../../context/ToDoProvider'

const PostToDo = () => {

    const navigation = useNavigation()

    const {
        user
    } = useContext(UserContext)

    const {
        getAllToDos,
        submitToDo
    } = useContext(ToDoContext)

    const {
        username
    } = user

    const {control, handleSubmit} = useForm()
    

    function onSubmitPress(data) {
        submitToDo(username, data)
        getAllToDos()
        navigation.goBack()

    }


  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <CustomInput 
            name='title'
            placeholder='What do you need to do?'
            control={control}
            rules={{
            required: 'Title is required'
            }}
            keyboardType="default"
            />
            <CustomInput 
            name='description'
            placeholder='* Notes'
            control={control}
            rules={{
                required: 'Title is required'
            }}
            />
    
            <CustomButton 
            text='Submit'
            onPress={handleSubmit(onSubmitPress)}
            />
        </View>
    </View>
  )
}

export default PostToDo

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
    }
})