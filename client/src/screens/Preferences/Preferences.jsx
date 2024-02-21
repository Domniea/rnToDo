import { Alert, StyleSheet, useWindowDimensions, ScrollView, Text, View, Switch } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext} from 'react'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';


import CustomButton from '../../components/CustomButton'

import { UserContext } from '../../context/UserProvider';
import { ThemeContext } from '../../context/ThemeProvider';
import { ToDoContext } from '../../context/ToDoProvider';


const Preferences = () => {

    const {
        theme,
        setTheme,
        changeTheme,
        switchState
    }  = useContext(ThemeContext)
    
    const { width, height } = useWindowDimensions()

    const navigation = useNavigation()

    const { colors } = useTheme()


    const {
        user,
        setUser,
        handleSignOut,
        handleDeleteAccount
    } = useContext(UserContext)

    const {
        allToDos,
        deleteAllToDos 
    } = useContext(ToDoContext)


    const { username } = user

    function handleDeleteToDoSubmit(username) {
        deleteAllToDos(username)
        navigation.navigate('Home')
    }

    function handleDeleteUserSubmit(username) {
        deleteAllToDos(username)
        handleDeleteAccount(username)
        navigation.navigate('Home')
     }

    //Delete User
    const [toggleDeleteWarn, setToggleDeleteWarn] = useState(false)

    function toggleDeleteWarning() {
        setToggleDeleteWarn(prevState => !prevState)
    }

  return (
    <ScrollView>
        <View style={height >= 500 ? styles.containerScreen : styles.containerScreenLANDSCAPE}>
            <Text style={[{color: colors.text}, styles.header]}>Preferences</Text>
            
            { 
                !toggleDeleteWarn ?
                <>
                    <CustomButton
                        text='Change Password'
                        onPress={()=> navigation.navigate('EditPassword')}
                    />
                    <CustomButton
                        text='Log Out'
                        onPress={handleSignOut}
                    />
                    <CustomButton 
                            text='Delete ToDOs' 
                            onPress={()=> handleDeleteToDoSubmit(username)}
                    />
                    <CustomButton 
                        text='Delete Account' 
                        onPress={toggleDeleteWarning}
                    />
                    <View style={styles.toggleContainer}>
                        <Text style={[{color: colors.text}, styles.test]}>Toggle Theme</Text>
                        <Switch 
                            onChange={() => changeTheme()}
                            value={switchState}
                        />
                    </View>
                    
                </>
                :
                <>
                    <View style={styles.containerDeleteWarning}>
                        <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                        <CustomButton 
                            text ='Delete Account' 
                            onPress={() => handleDeleteUserSubmit(username)} 
                        />
                        <CustomButton 
                            text='Go Back' 
                            onPress={toggleDeleteWarning}
                        />
                       
                    </View>
                </>     
            }
            {/* <View style={styles.footer}> */}
                
            {/* </View> */}
        </View>
    </ScrollView>
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
    containerScreenLANDSCAPE: {
        marginHorizontal: '10%',
        marginVertical: '2%',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-around'
    },
    header: {
        margin: '2%',
        fontSize: 35
    },
    containerDeleteWarning: {
        width: '100%',
        padding: '5%',
        backgroundColor: '#FFF',
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
    toggleContainer: {
        alignItems: 'center',
        fontSize: 35,
    },
    test: {
        // padding: '5%',
        fontSize: 20
    }
})