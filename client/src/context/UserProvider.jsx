import React, { useEffect } from "react";
import { useState, createContext } from "react";
import axios from 'axios'
import { signOut } from 'aws-amplify/auth'
import { getCurrentUser } from 'aws-amplify/auth';

const UserContext = createContext()


function UserProvider(props) {

    const [user, setUser] = useState(undefined)
    
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

    useEffect(() => {
        checkUser()
    }, [])

    
    function onFacebook() {
        console.log('Facebook In')
    }

     function onApple() {
        console.log('Apple In')
    }


    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                handleSignOut,
                checkUser,
                onFacebook,
                onApple,
                // deleteAllToDos,
                handleDelete
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
