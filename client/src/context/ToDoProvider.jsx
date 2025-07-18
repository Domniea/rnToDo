import React from "react";
import {useState, createContext, useContext} from 'react'
import axios, { all } from 'axios'

import { UserContext } from "./UserProvider";
import { ListsContext } from "./ListsProvider";


const ToDoContext = createContext()

function ToDoProvider(props) {

    const {
        lists,
        setLists,
        setHomeList,
        homeList
    } = useContext(ListsContext)


    const [ allToDos, setAllToDos] = useState([])



    const { user } = useContext(UserContext)
    
    //Get All
    async function getAllToDos() {
        try{
            const data = await axios.get('https://rntodo-production.up.railway.app/todo/')
        // const data = await axios.get('http://localhost:9000/todo/')
            setAllToDos(data.data)
            }
        catch(error) {
          console.log(error)
        }
      }
    
    //Get Users ToDo
    async function getUsersToDo(username) {
        try{
            const data = await axios.get(`https://rntodo-production.up.railway.app/todo/${username}`)
            // const data = await axios.get(`http://localhost:9000/todo/${username}`)
            setAllToDos(data.data)
        
        }
        catch(error) {
          console.log(error)
        }
      }

    // Post ToDo
    async function submitToDo(path, userData) {
        try {
            const data = await axios.post(`https://rntodo-production.up.railway.app/todo/${path}`, userData)
            // const data = await axios.post(`http://localhost:9000/todo/${path}`, userData)
            setAllToDos(prevState => {
                return [...prevState,
                data.data]
            })
        }
        catch(error) {
        console.log(error)
        }
    }

    async function submitToDo(path, userData) {
        try {
            const res = await axios.post(`https://rntodo-production.up.railway.app/todo/${path}`, userData)
            // const data = await axios.post(`http://localhost:9000/todo/${path}`, userData)
            const listTitle = res.data.todo.list
            setLists(prevState => {
               return prevState.map((obj, i) => {
                    return  obj.list === listTitle ? 
                    {...obj, data: [...obj.data, res.data.todo]}:
                    obj
                })
            })

        }
        catch(error) {
        console.log(error)
        }
    }
      


    
    //Edit ToDo
    async function editToDo(path, userData) {
        try {
            const data = await axios.put(`https://rntodo-production.up.railway.app/todo/${path}`, userData)
            // const data = await axios.put(`http://localhost:9000/todo/${path}`, userData)
        }
        catch(error) {
            console.log(error)
        }
    }

    //Delete ToDo
    // async function deleteToDo(id) {
    //     console.log('deleted')
    //     try {
    //         const data = await axios.delete(`https://rntodo-production.up.railway.app/todo/${id}`)
    //         // const data = await axios.delete(`http://localhost:9000/todo/${id}`)
    //         setAllToDos(prevState => {
    //             return prevState.filter(person => person._id !== id)
    //         })
    //     }
    //     catch(error) {
    //         console.log(error)
    //     }
    // }


    async function deleteToDo(listname, id) {
       
        console.log('deleted')
        try {
            const data = await axios.delete(`https://rntodo-production.up.railway.app/todo/${id}`)
            // const data = await axios.delete(`http://localhost:9000/todo/${id}`)
   
            console.log(data.res)
            setLists(prevState => {
                const update = []
               prevState.map((obj, i) => {
                console.log('OBJ', obj)
                if(obj.list === listname){
                    const dataUpdate = obj.data.filter(task => task._id !== id)
                    
                    return update.push({list: listname, data: dataUpdate})

                } else {
                    return update.push(obj)
                }
                
                })
                return update
            })
            
        }
        catch(error) {
            console.log(error)
        }
    }

    // setLists(prevState => {
    //     return prevState.map((obj, i) => {
    //          return  obj.list === listTitle ? 
    //          {...obj, data: [...obj.data, res.data.todo]}:
    //          obj
    //      })
    //  })






//DELETE ALL
    async function deleteAllToDos(username) {
        try {
            const responseData = await axios.delete(`https://rntodo-production.up.railway.app/todo/delete/${username}`)
            // const responseData = await axios.delete(`http://localhost:9000/todo/delete/${username}`)
            setAllToDos([])
            console.log("All USER TODO's DELETED")
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return (
        <ToDoContext.Provider
            value={{
                allToDos,
                setAllToDos,
                getAllToDos,
                getUsersToDo,
                submitToDo,
                editToDo,
                deleteToDo,
                deleteAllToDos
            }}
        >
            {props.children}
        </ToDoContext.Provider>
    )
}

export { ToDoContext, ToDoProvider}