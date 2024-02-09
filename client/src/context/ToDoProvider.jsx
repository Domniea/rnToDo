import React from "react";
import {useState, createContext, useContext} from 'react'
import axios from 'axios'

import { UserContext } from "./UserProvider";


const ToDoContext = createContext()

function ToDoProvider(props) {

    const [ allToDos, setAllToDos] = useState([])

    const { user } = useContext(UserContext)
    
    //Get All
    async function getAllToDos() {
        try{
          const data = await axios.get('https://rntodo-production.up.railway.app/todo/')
          setAllToDos(data.data)
        }
        catch(error) {
          console.log(error)
        }
      }
    
    //Get Users ToDo
    async function getUsersToDo(userId) {
        try{
          const data = await axios.get(`https://rntodo-production.up.railway.app/todo/${userId}`)
          setAllToDos(data.data)
        
        }
        catch(error) {
          console.log(error)
        }
      }

    //Post ToDo
    async function submitToDo(path, data) {
        try {
            const response = await axios.post(`https://rntodo-production.up.railway.app/todo/${path}`, data)
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
            const response = await axios.put(`https://rntodo-production.up.railway.app/todo/${path}`, data)
        }
        catch(error) {
            console.log(error)
        }
    }

    //Delete ToDo
    async function deleteToDo(path) {
        console.log('deleted')
        try {
            const response = await axios.delete(`https://rntodo-production.up.railway.app/todo/${path}`)
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
                editToDo,
                deleteToDo
            }}
        >
            {props.children}
        </ToDoContext.Provider>
    )
}

export { ToDoContext, ToDoProvider}