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
      
    async function submitToDo(data, path) {
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

    return (
        <ToDoContext.Provider
            value={{
                allToDos,
                setAllToDos,
                getAllToDos,
                submitToDo
            }}
        >
            {props.children}
        </ToDoContext.Provider>
    )
}

export { ToDoContext, ToDoProvider}