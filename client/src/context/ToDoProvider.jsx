import React from "react";
import {useState, createContext,useContext} from 'react'
import axios from 'axios'


const ToDoContext = createContext()

function ToDoProvider(props) {

    const [ allToDos, setAllToDos] = useState([])

    async function getAllToDos() {
        try{
          const data = await axios.get('https://rntodo-production.up.railway.app/todo')
          setAllToDos(data.data)
        }
        catch(error) {
          console.log(error)
        }
      }
      
    async function submitToDo(path, data) {
        try {
          const response = await axios.post(`https://rntodo-production.up.railway.app/todo/${path}`, data)
          console.log(response.params)
          setAllToDos(prevState => {
            return [...prevState,
            response]
          })
        }
        catch(error) {
          console.log(error)
        }
      }

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
                submitToDo,
                deleteToDo
            }}
        >
            {props.children}
        </ToDoContext.Provider>
    )
}

export { ToDoContext, ToDoProvider}