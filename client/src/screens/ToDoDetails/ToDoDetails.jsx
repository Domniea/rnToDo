import { Modal, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { ToDoContext } from '../../context/ToDoProvider'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const ToDoDescription = (props) => {
    const { height } = useWindowDimensions()
    const [edit, setEdit] = useState(false)

    const {control, handleSubmit} = useForm()
                
    const{
        editToDo,
        setAllToDos
    } = useContext(ToDoContext)
    // const {
    //     title,
    //     notes,
    //     _id
    // } = route.params

    const {
        toggleModal,
        title,
        notes,
        _id
    } = props

    function toggleEdit() {
        setEdit(prevState => !prevState)
        
    }
    function onSubmit(data) {
        editToDo( _id, data)
        setAllToDos([])
        toggleModal()
    }

    
    return (
        <Modal transparent={true}>
            <View style={styles.container}>
                <View style={styles.modal}>
                    {
                        !edit ?
                        <View style={styles.notes}>
                            <Text style={styles.header}>{title}</Text>
                            <Text style={styles.secondary}>{notes}</Text>
                            <CustomButton 
                                text='Edit'
                                onPress={() => toggleEdit()}
                            />
                        </View>
                        :
                        <View style={styles.edit}>
                            <CustomInput 
                                name='title'
                                placeholder={title}
                                control={control}
                                keyboardType='default'
                            />
                            <CustomInput 
                                name='description'
                                placeholder={notes}
                                control={control}
                                keyboardType='default'
                            />
                            <CustomButton 
                                text='Edit'
                                onPress={() => toggleEdit()}
                            />
                            <CustomButton 
                                text='Save'
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>
                    }
                    
                   
            
                
                </View>
            </View>
        </Modal>
  )
}

export default ToDoDescription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        padding: '5%',
        height: '50%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    notes: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 40,
        margin:'5%'
    },
    secondary: {
        fontSize: 25,
        marginBottom: '5%',
        textAlign: 'center'
    },
    edit: {
        backgroundColor: 'white',
        width: '100%'
        // width: '90%'
    }
})