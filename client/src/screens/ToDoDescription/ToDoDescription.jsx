import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const ToDoDescription = ({route,navigation}) => {
    const { height } = useWindowDimensions()
    const [edit, setEdit] = useState(false)

    const {control, handleSubmit} = useForm()
                
    const {
        title,
        notes,
        _id
    } = route.params

    function toggleEdit() {
        setEdit(prevState => !prevState)
    }

    
    return (
        <View style={{height: '60%'}}>
            {
                !edit ?
                <>
                    <Text>{title}</Text>
                    <Text>{notes}</Text>
                    <Text>{_id}</Text>
                </>
                :
                <>
                    <CustomInput 
                        name='title'
                        placeholder='Title'
                        control={control}
                        keyboardType='default'
                    />
                    <Text>Edit Inputs</Text>
                </>
            }
        
        <CustomButton 
            text='Edit'
            onPress={() => toggleEdit()}
        />
    
        
        </View>
  )
}

export default ToDoDescription

const styles = StyleSheet.create({
    container: {
       
    }
})