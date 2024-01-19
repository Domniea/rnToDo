import React from "react";
import {useState, createContext,useContext} from 'react'
import axios from 'axios'


const ToDoContext = createContext()

function ToDoProvider(props) {

    const [ allToDos, setAllToDos] = useState([])

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
        console.log(response)
        setAllToDos(prevState => {
            return [...prevState,
            response]
        })
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
            console.log(response)
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