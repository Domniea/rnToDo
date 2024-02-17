import React, { useContext } from 'react'
import { StyleSheet, useWindowDimensions, Text, View, TouchableWithoutFeedback, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'


import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'

import { UserContext } from '../../context/UserProvider'
import { ToDoContext } from '../../context/ToDoProvider'

const PostToDo = (props) => {

    const { height } = useWindowDimensions()

    const navigation = useNavigation()

    const {
        user
    } = useContext(UserContext)

    const {
        submitToDo
    } = useContext(ToDoContext)

    const {
        username
    } = user
    
    const {
        fromToggle,
        toggleModal,
        setAddToDoVisible
    } = props
    
    const {control, handleSubmit} = useForm()
    
    //Dismiss modal
    function disregardModal() {
        setAddToDoVisible(false)
    }

    
    function onSubmitPress(data) {
        submitToDo(username, data)
        {props.route && navigation.goBack() }
        {fromToggle && toggleModal()}
    }

  return (
      <Modal 
        supportedOrientations={[
            'portrait', 
            'landscape',
            'landscape-left', 
            'landscape-right'
            ]} 
            animationType='slide' 
            transparent={true}
        >

        <TouchableWithoutFeedback onPress={disregardModal}>

            <View style={styles.container}>

                <View style={height >= 500 ? styles.form : styles.formLANDSCAPE}>
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
                    />
                    <CustomButton 
                    text='Submit'
                    onPress={handleSubmit(onSubmitPress)}
                    />
                </View>
                
            </View>
            
        </TouchableWithoutFeedback>

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
    },
    formLANDSCAPE: {
        backgroundColor: '#FFF',
        padding: '10%',
        height: '60%',
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10
    },
})