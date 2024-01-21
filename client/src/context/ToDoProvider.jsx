import React from "react";
import {useState, createContext, useContext} from 'react'
import axios from 'axios'

import { UserContext } from "./UserProvider";


const ToDoContext = createContext()

function ToDoProvider(props) {

    const [ allToDos, setAllToDos] = useState([])

    const { user } = useContext(UserContext)

    // const { username} = user
    
    // console.log('user', user)
    

    //Get All
    async function getAllToDos() {
        try{
          const data = await axios.get('http://localhost:9000/todo/')
          setAllToDos(data.data)
        }
        catch(error) {
          console.log(error)
        }
      }
    
    //Get Users ToDo
    async function getUsersToDo(userId) {
        try{
          const data = await axios.get(`http://localhost:9000/todo/${userId}`)
          setAllToDos(data.data)
        
        }
        catch(error) {
          console.log(error)
        }
      }

    //Post ToDo
    async function submitToDo(path, data) {
        try {
            const response = await axios.post(`http://localhost:9000/todo/${path}`, data)
            setAllToDos(prevState => {
                return [...prevState,
                response]
            })

        }
        catch(error) {
        console.log(error)
        }
    }
    
    //Edit ToDo
    async function editToDo(path, data) {
        try {
            const response = await axios.put(`http://localhost:9000/todo/${path}`, data)
        }
        catch(error) {
            console.log(error)
        }
    }

    //Delete ToDo
    async function deleteToDo(path) {
        console.log('deleted')
        try {
            const response = await axios.delete(`http://localhost:9000/todo/${path}`)
        }
        catch(error) {
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
                deleteToDo
            }}
        >
            {props.children}
        </ToDoContext.Provider>
    )
}

export { ToDoContext, ToDoProvider}