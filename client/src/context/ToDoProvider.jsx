import { createContext, useCallback, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import { ListsContext } from './ListsProvider';

export const ToDoContext = createContext({
  allToDos: [],
  setAllToDos: () => {},
  getAllToDos: async () => {},
  getUsersToDo: async (_username) => {},
});

const API_BASE = 'https://rntodo-production.up.railway.app';

export function ToDoProvider({ children }) {
  const [allToDos, setAllToDos] = useState([]);
  const { setLists } = useContext(ListsContext);

  // GET: all
  const getAllToDos = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/todo/`);
      setAllToDos(res.data || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // GET: user
  const getUsersToDo = useCallback(async (username) => {
    try {
      const res = await axios.get(`${API_BASE}/todo/${encodeURIComponent(String(username || ''))}`);
      setAllToDos(res.data || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value = useMemo(
    () => ({
      allToDos,
      setAllToDos,
      getAllToDos,
      getUsersToDo,
      // submitToDo,
      // editToDo,
    }),
    [allToDos, getAllToDos, getUsersToDo, 
      // submitToDo, editToDo, deleteToDo, deleteAllToDos
    ]
  );

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
}
