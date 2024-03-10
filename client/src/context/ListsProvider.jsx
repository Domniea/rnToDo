import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native'
import React, {
    useState,
    createContext,
    useEffect
} from 'react'
import axios from 'axios'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

const ListsContext = createContext()

const ListsProvider = (props) => {

const [lists, setLists] = useState([])

    //Get Lists
    function getSections(data) {
        return Object.values(
            data.reduce((result, todo) => {
                const listName = todo.list
                if(!result[listName]){
                    result[listName] = [todo]     
                }
                else {
                result[listName].push(todo)
                }
                return result
            }, [])
        )
    }


    async function getUsersLists() {
        try {
            const res = await axios.get('https://rntodo-production.up.railway.app/todo/domniea!')
            // console.log(res)

            setLists(getSections(res.data))
        }
        catch (error) {
            console.log(error)
        }
    }

    // const temp = getSections(lists)
    // console.log(temp[1])
    // console.log(lists)



    useEffect(() => {
        getUsersLists()
    }, [])

    return (
    <ListsContext.Provider
        value={
            {
                test: 'test',
                lists,
                setLists
            }
        }
    >
        {props.children}
    </ListsContext.Provider>
    )
}

export {ListsContext, ListsProvider}

const styles = StyleSheet.create({})