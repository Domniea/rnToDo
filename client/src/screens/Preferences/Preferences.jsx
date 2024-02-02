import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'

import CustomButton from '../../components/CustomButton'

const Preferences = () => {

const [toggleDeleteWarn, setToggleDeleteWarn] = useState(false)


function toggleDeleteWarning() {
    setToggleDeleteWarn(prevState => !prevState)
}

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Preferences</Text>
        { 
            toggleDeleteWarn &&
            <>
                <View>
                    <Text>Are you sure you want to delete your account?</Text>
                </View>
            </>     
        }
        <CustomButton text='Delete Account' onPress={toggleDeleteWarning}/>
    </View>
  )
}

export default Preferences

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        margin: '10%',
        fontSize: 35
    }
})