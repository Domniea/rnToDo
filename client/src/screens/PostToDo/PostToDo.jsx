import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollViewBase, TouchableWithoutFeedback,Keyboard, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'


import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'

import { UserContext } from '../../context/UserProvider'
import { ToDoContext } from '../../context/ToDoProvider'

const PostToDo = (props) => {

    const navigation = useNavigation()

    const {
        user
    } = useContext(UserContext)

    const {
        getAllToDos,
        getUsersToDo,
        submitToDo,
        editToDo
    } = useContext(ToDoContext)

    const {
        username
    } = user

    const {
        toggleModal
    } = props
    const {control, handleSubmit} = useForm()
    
    console.log(toggleModal)
    function onSubmitPress(data) {
        submitToDo(username, data)
        // getUsersToDo(username)
        // navigation.goBack()
        toggleModal()
    }
    console.log(username)

  return (
    <Modal animationType='slide' transparent={true}>
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
    </Modal>
  )
}

export default PostToDo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        backgroundColor: '#FFF',
        padding: '10%',
        height: '30%',
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 100
    }
})