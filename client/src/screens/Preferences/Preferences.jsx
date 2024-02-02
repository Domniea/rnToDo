import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useContext} from 'react'
import { deleteUser } from 'aws-amplify/auth';
import { UserContext } from '../../context/UserProvider';

import CustomButton from '../../components/CustomButton'

const Preferences = () => {

    const {
        setUser
    } = useContext(UserContext)

    const [toggleDeleteWarn, setToggleDeleteWarn] = useState(false)

    function toggleDeleteWarning() {
        setToggleDeleteWarn(prevState => !prevState)
        setTimeout(() => {
            console.log("first")
            }, 5000
        );
        setTimeout(() => {
            console.log("second")
            }, 2000
        );

    }

    async function handleDelete() {
        try {
            // await deleteUser()
            console.log('Your account has been permanently deleted')
            // setTimeout(() => {
            //     setUser(undefined)
            //     }, 5000
            // )
        }
        catch(error) {
            console.log(error)
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Preferences</Text>
        { 
            !toggleDeleteWarn ?
            <>
              <CustomButton text='Delete Account' onPress={toggleDeleteWarning}/>
            </>
            :
            <>
                <View>
                    <Text>Are you sure you want to delete your account?</Text>
                    <CustomButton text ='Delete Account' />
                    <CustomButton text='Go Back' onPress={toggleDeleteWarning}/>
                </View>
            </>     
        }
        
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