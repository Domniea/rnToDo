import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import React, { useState } from 'react'

const ToDo = (props) => {

    const {
        title,
        notes,
        isDone
    } = props

    const [isCompleted, setIsCompleted] = useState(false)
  return (
    <View style={styles.inline}>
        {/* <CheckBox 
            style={styles.checkbox}
            lineWidth={1}
            value={isCompleted}
            onValueChange={setIsCompleted}
        /> */}
        <Text style={styles.todo}>{title}</Text>
        {/* <Text>{notes}</Text> */}

    </View>
  )
}

export default ToDo

const styles = StyleSheet.create({
    inline: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // width: '100%'
        alignSelf: 'center'
    },
    todo: {
        fontSize: 25,
        margin: 5
    },
    checkbox: {
        margin: 5
    }

})