import React from "react";
import { useState, createContext } from "react";
import { useNavigation } from "@react-navigation/native";

const UserContext = createContext()


function UserProvider(props) {
    // const [user, setUser] = useState({
        //     username: '',
        //     password: ''
        // })
        
    // const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordReType, setPasswordReType] = useState('')
    const [conformationCode, setConformationCode] = useState('')
    const [passResetCode, setPassResetCode] = useState('')
    const [newPass, setNewPass] =useState('')
    const [usernameResetCheck, setUsernameResetCheck] = useState('')


  
    function onSignUp() {
        console.log('Sign Up')
    }

    function onGoogle() {
        console.log('Google In')
    }

    function onFacebook() {
        console.log('Facebook In')
    }

     function onApple() {
        console.log('Apple In')
    }

  

    function onSendPress() {
        console.log('Sent')
    }

    function onSubmitPress() {
        console.log('Submitted')
    }

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
                email,
                setEmail,
                password,
                setPassword,
                usernameResetCheck,
                setUsernameResetCheck,
                passwordReType,
                setPasswordReType,
                passResetCode,
                setPassResetCode,
                newPass,
                setNewPass,
                conformationCode,
                setConformationCode,
                onSignUp,
                onSendPress,
                onSubmitPress,
                onGoogle,
                onFacebook,
                onApple
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
