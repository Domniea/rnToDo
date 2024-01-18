import React, { useEffect } from "react";
import { useState, createContext } from "react";

import { getCurrentUser } from 'aws-amplify/auth';

const UserContext = createContext()


function UserProvider(props) {
    // const [user, setUser] = useState({
        //     username: '',
        //     password: ''
        // })
        
    // const navigation = useNavigation()

    const [user, setUser] = useState(undefined)
    const [ allToDos, setAllToDos] = useState([])

    async function checkUser() {
        try {
            const response = await getCurrentUser({bypassCache: true});
            setUser(response)
        } catch (err) {
            console.log(err);
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
                allToDos,
                setAllToDos,
                setUser,
                checkUser,
                onFacebook,
                onApple
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
