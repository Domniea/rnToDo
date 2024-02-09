import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from '@react-navigation/native'

import { ToDoContext } from '../../context/ToDoProvider'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const ToDoDescription = (props) => {

    const { colors } = useTheme()

    const { height } = useWindowDimensions()

    const [edit, setEdit] = useState(false)

    const {control, handleSubmit} = useForm()
                
    const{
        editToDo,
        setAllToDos
    } = useContext(ToDoContext)

    const {
        toggleModal,
        title,
        notes,
        _id,
        setDetailsVisible
    } = props

    //Modal dismiss
    function disregardDetailsModal() {
        setDetailsVisible(false)
    }

    //Toggle edit inputs
    function toggleEdit() {
        setEdit(prevState => !prevState)
    }

    //Submit Edits
    function onSubmit(data) {
        editToDo( _id, data)
        setAllToDos([])
        toggleModal()
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
            <TouchableWithoutFeedback onPress={disregardDetailsModal}>
                <View style={styles.container}>
                        {
                            !edit ?
                            <View style={height >=500 ? styles.notes : styles.notesLANDSCAPE}>
                                <Text style={styles.header}>{title}</Text>
                                <Text style={styles.secondary}>{notes}</Text>
                                <CustomButton 
                                    text='Edit'
                                    onPress={() => toggleEdit()}
                                />
                            </View>
                            :
                            <View style={height >=500 ? styles.edit : styles.editLANDSCAPE}>
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
            </TouchableWithoutFeedback>
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
    test:{
        backgroundColor: 'green'
    },
    notes: {
        backgroundColor: 'white',
        paddingHorizontal: '3%',
        height: '35%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    notesLANDSCAPE: {
        backgroundColor: '#FFF',
        paddingHorizontal: '10%',
        height: '60%',
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10
    },
    header: {
        fontSize: 30,
        margin:'5%',
        textAlign: 'center'
    },
    secondary: {
        fontSize: 20,
        marginBottom: '5%',
        textAlign: 'center'
    },
    edit: {
        backgroundColor: 'white',
        padding: '5%',
        height: '35%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
        
    },
    editLANDSCAPE: {
        backgroundColor: '#FFF',
        padding: '10%',
        height: '60%',
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10
    }
})