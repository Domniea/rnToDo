import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TestTask = (props) => {
  return (
    <View>
      <Text style={styles.text}>TestTask</Text>
    </View>
  )
}

export default TestTask

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 50
    }
})