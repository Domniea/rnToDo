import {AsyncStorage} from 'react-native'
import React, { useContext } from "react";
import { useEffect, useState, createContext } from "react";
import { signOut } from 'aws-amplify/auth'
import { getCurrentUser } from 'aws-amplify/auth';
import { deleteUser } from "aws-amplify/auth"; 

import { storage } from '../Storage';

const UserContext = createContext()


function UserProvider(props) {

    const [user, setUser] = useState(undefined)

    if(user) {
        const { username } = user
        // console.log(username)
        storage.set('USERNAME', username)
    }





    // if(user !== undefined){
    //     _storeData = async (user) => {
    //         try{
    //             await AsyncStorage.setItem(
    //                 'test'
    //             )
    //         } catch(error) {
    //             console.log(error)
    //         }
    //     } 
    // }

    // _retrieveData = async () => {
    //     try{
    //         const value = await AsyncStorage.getItem('TASKS')
    //         if (value !== null) {
    //             console.log(value)
    //         }
    //     }
    //     catch(error) {
    //         console.log(error)
    //     }
    // }

    async function checkUser() {
        try {
            const response = await getCurrentUser({bypassCache: true});
            setUser(response)
        } catch (err) {
            console.log(err);
        }
    }

    //Signout User
    async function handleSignOut() {
        try {
          await signOut();
        } catch (error) {
          console.log('error signing out: ', error);
        }
      }

      async function handleDeleteAccount() {
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

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                handleSignOut,
                checkUser,
                handleDeleteAccount
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
