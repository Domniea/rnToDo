import React, { useEffect } from "react";
import { useState, createContext } from "react";
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
