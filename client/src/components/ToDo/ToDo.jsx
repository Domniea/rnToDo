import { StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
// import { useNavigation } from '@react-navigation/native'

import CustomButton from '../CustomButton'
import PostToDo from '../../screens/PostToDo'
// import Navigation from '../../Navigation'
import ToDoDescription from '../../screens/ToDoDescription/ToDoDescription'


const ToDo = (props) => {

    // const navigation = useNavigation()

    const { height, width } = useWindowDimensions()

    const {
        title,
        _id,
        notes,
        isDone,
        onPress,
        navigation
    } = props

    return (
        <View style={styles.inline}>
            <Text 
                style={styles.todo} 
                onPress={() => navigation.navigate('ToDoDescription', {title: title, notes: notes, _id: _id})} 
            >
                {title}
            </Text>
            <CustomButton text='delete' onPress={onPress} bgColor='#e3e3e3' fgColor='#666666' btnWidth={width * .25}/>
        </View>
  )
}

export default ToDo

const styles = StyleSheet.create({
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    todo: {
        fontSize: 25,
        margin: 5
    },
    checkbox: {
        margin: 5
    }

})