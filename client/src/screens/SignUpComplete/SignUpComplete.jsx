import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useContext } from 'react'

import CustomButton from '../../components/CustomButton'
import { UserContext } from '../../context/UserProvider'

const SignUpComplete = (props) => {

    const { setUser } = useContext(UserContext)

    const {route} = props
    console.log(route.params.username)

    function transitionToHome() {
        setUser({username: username.toLowerCase()})
    }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up is SignUpComplete!</Text>
      <Text>Welcome to "The Best ToDo App"</Text>
     {/* <CustomButton text='Click Me To Get Started' onPress={()=> transitionToHome}/> */}
    </View>
  )
}

export default SignUpComplete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 50
    },
    header2: {
        fontSize: 30
    }
})