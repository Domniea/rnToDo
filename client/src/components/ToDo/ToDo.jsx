import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'

import CustomButton from '../CustomButton'

const ToDo = (props) => {

    const { height, width } = useWindowDimensions()

    const {
        title,
        notes,
        isDone,
        onPress
    } = props
  
    return (
        <View style={styles.inline}>
            <Text style={styles.todo}>{title}</Text>
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