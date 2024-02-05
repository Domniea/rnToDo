import { StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'

import CustomButton from '../CustomButton'
import PostToDo from '../../screens/PostToDo'
import ToDoDetails from '../../screens/ToDoDetails/ToDoDetails'


const ToDo = (props) => {

    const {colors} = useTheme()
    
    const [detailsVisible, setDetailsVisible] = useState(false)

    function toggleDetails() {
        setDetailsVisible(prevState => !prevState)
      }

    const { height, width } = useWindowDimensions()

    const {
        title,
        _id,
        notes,
        onPress
    } = props

    return (
        <View style={styles.inline}>
           { 
            detailsVisible && 
                <ToDoDetails 
                    title={title} 
                    _id={_id} notes={notes} 
                    toggleModal={toggleDetails}
                    setDetailsVisible={setDetailsVisible}
                /> 
            }
            <Text 
                style={[{color: colors.text},styles.todo]} 
                onPress={toggleDetails}
            >
                {title}
            </Text>
            <CustomButton 
                text='delete' 
                onPress={onPress} 
                bgColor='#e3e3e3' 
                fgColor='#666666' 
                btnWidth={width * .25}
            />
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
        margin: 5,
      
    }

})