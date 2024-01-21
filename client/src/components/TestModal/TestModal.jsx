import { StyleSheet, Text, View, Modal, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import {useForm} from 'react-hook-form'
import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'

const TestModal = (props) => {
    const { toggleModal, test } = props

    const {control, handleSubmit} = useForm()

  return (
        <KeyboardAvoidingView behavior='padding'>
            <Modal transparent={true} animationType='slide'>
                <View style={styles.container}>
                    <View style={styles.popUp}>
                        <Text>Add ToDo</Text>
                        <CustomInput
                            name='title'
                            placeholder='Type title here'
                            control={control}
                        />
                        <CustomInput
                            name='description'
                            placeholder='Type notes here'
                            control={control}
                        />
                        <CustomButton text='hide' onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
  )
}

export default TestModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popUp: {
        backgroundColor: '#FFF',
        height: '30%',
        width: '70%',
        padding: 30,
        borderRadius: 10,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1
        
    }
})