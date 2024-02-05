import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useContext} from 'react'
import { UserContext } from '../../context/UserProvider';
import { useTheme } from '@react-navigation/native'
import { Appearance } from 'react-native';

import { deleteUser } from 'aws-amplify/auth';

import CustomButton from '../../components/CustomButton'

const Preferences = () => {

    const { colors } = useTheme()

    const [toggleTheme, setToggleTheme] = useState(true)

    // function toggleColors() {
    //     setToggleTheme(prevState => !prevState)
    // }

    function darkSet(){

        Appearance.setColorScheme('dark')
    }    
    function lightSet(){

        Appearance.setColorScheme('light')
    }    


    const {
        setUser,
        handleSignOut
    } = useContext(UserContext)

    const [toggleDeleteWarn, setToggleDeleteWarn] = useState(false)

    function toggleDeleteWarning() {
        setToggleDeleteWarn(prevState => !prevState)
    }

    async function handleDelete() {
        try {
            await deleteUser()
            Alert.alert('Your account has been permanently deleted')
            setTimeout(() => {
                setUser(undefined)
                }, 2000
            )
        }
        catch(error) {
            console.log(error)
        }
    }


  return (
    <View style={styles.containerScreen}>
        <Text style={[{color: colors.text}, styles.header]}>Preferences</Text>
        
        { 
            !toggleDeleteWarn ?
            <>
                <CustomButton
                    text='Log Out'
                    onPress={handleSignOut}
                />
                <CustomButton 
                    text='Delete Account' 
                    onPress={toggleDeleteWarning}
                />
                <CustomButton text='Dark Theme' onPress={() => darkSet()}/>
                <CustomButton text='Light Theme' onPress={() => lightSet()}/>
            </>
            :
            <>
                <View style={styles.containerDeleteWarning}>
                    <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                    <CustomButton text ='Delete Account' onPress={handleDelete} />
                    <CustomButton text='Go Back' onPress={toggleDeleteWarning}/>
                </View>
            </>     
        }
        {/* <View style={styles.footer}> */}
            
        {/* </View> */}
    </View>
  )
}

export default Preferences

const styles = StyleSheet.create({
    containerScreen: {
        margin: '10%',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-around'
    },
    header: {
        margin: '5%',
        fontSize: 35
    },
    containerDeleteWarning: {
        width: '100%',
        padding: '5%',
        backgroundColor: '#a6a6a650',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    modalText:{
        margin: '10%',
        fontSize: 20,
        textAlign: 'center'
    },
    // footer: {
    //     position: 'absolute',
    //     width: '100%',
    //     bottom: 0,
    // }
})