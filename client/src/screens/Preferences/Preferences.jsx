import { Alert, StyleSheet, useWindowDimensions, ScrollView, Text, View, Switch } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext} from 'react'
import { UserContext } from '../../context/UserProvider';
import { useTheme } from '@react-navigation/native'
import { Appearance } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { deleteUser } from 'aws-amplify/auth';

import CustomButton from '../../components/CustomButton'
import { ThemeContext } from '../../context/ThemeProvider';


const Preferences = () => {

    const {
        theme,
        setTheme,
        changeTheme
    }  = useContext(ThemeContext)
    
    const { width, height } = useWindowDimensions()

    const navigation = useNavigation()

    const { colors } = useTheme()

    const [toggle, setToggle] = useState()

    // function onThemeChange() {
    //     const newColor = Appearance.getColorScheme()
    //     setTheme(newColor)
    // }


    // function changeTheme() {
    //     if(theme === 'dark') {
    //         setTheme('light')
    //         Appearance.setColorScheme('light')
    //     }
    //     else {
    //         setTheme('dark')
    //         Appearance.setColorScheme('dark')
    //     }
    // }

    // function darkSet(){
    //     Appearance.setColorScheme('dark')
    // }    

    // function lightSet(){
    //     Appearance.setColorScheme('light')
    // }    


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
                        text='Delete Account' 
                        onPress={toggleDeleteWarning}
                    />
                     {/* <CustomButton 
                            text='Toggle' 
                            onPress={()=> changeTheme()}
                        /> */}
                    <View style={styles.toggleContainer}>
                        <Text style={[{color: colors.text}, styles.test]}>Toggle Theme</Text>
                        <Switch 
                            onChange={() => changeTheme()}
                            value={theme}
                        />
                    </View>
                    
                </>
                :
                <>
                    <View style={styles.containerDeleteWarning}>
                        <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                        <CustomButton 
                            text ='Delete Account' 
                            onPress={handleDelete} 
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
    toggleContainer: {
        alignItems: 'center',
        fontSize: 35,
    },
    test: {
        // padding: '5%',
        fontSize: 20
    }
})