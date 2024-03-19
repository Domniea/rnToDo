import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native'
import React, {
    useState,
    createContext,
    useContext,
    useEffect,
} from 'react'
import axios from 'axios'

import { UserContext } from './UserProvider'
import { storage } from '../Storage'


const ListsContext = createContext()

const ListsProvider = (props) => {

    const [lists, setLists] = useState([])
   
    const [homeList, setHomeList] = useState('CreateList')

    const USERNAME = storage.getString('USERNAME')

console.log('listcon')



        //Get Lists
        // function getSections(data) {
        //     return Object.values(
        //         data.reduce((result, todo) => {
        //             const listName = todo.list
        //             if(!result[listName]){
        //                 result[listName] = [todo]     
        //             }
        //             else {
        //             result[listName].push(todo)
        //             }
        //             return result
        //         }, [])
        //     )
        // }

// Seperate Lists
    function getSections(data) {
        return Object.values(
            data.reduce((result, todo) => {
                const listName = todo.list
                if(!result[listName]){
                    result[listName] = {'list': listName, data: [todo]}
                }
                else {
                result[listName].data.push(todo)
                }
                return result
            }, [])
        )
    }


//Get Lists Call
    async function getUsersLists(username) {
        console.log('fire lists')
        try {
            
            const res = await axios.get(`https://rntodo-production.up.railway.app/todo/${username}`)

            setLists(getSections(res.data))
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersLists(USERNAME)
    }, [])

    return (
    <ListsContext.Provider
        value={
            {
                test: 'test',
                lists,
                homeList,
                setHomeList,
                setLists,
                getUsersLists
            }
        }
    >
        {props.children}
    </ListsContext.Provider>
    )
}

export {ListsContext, ListsProvider}

const styles = StyleSheet.create({})