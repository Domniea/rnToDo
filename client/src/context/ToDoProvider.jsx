import { createContext, useCallback, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import { ListsContext } from './ListsProvider';

export const ToDoContext = createContext({
  allToDos: [],
  setAllToDos: () => {},
  getAllToDos: async () => {},
  getUsersToDo: async (_username) => {},
  // submitToDo: async (_path, _payload) => {},
  // editToDo: async (_path, _payload) => {},
  // deleteToDo: async (_listName, _id) => {},
  // deleteAllToDos: async (_username) => {},
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

  // // POST: create
  // const submitToDo = useCallback(async (path, payload) => {
  //   try {
  //     const res = await axios.post(
  //       `${API_BASE}/todo/${encodeURIComponent(String(path || ''))}`,
  //       payload
  //     );
  //     // some endpoints return { todo }, some return the todo directly; keep this simple:
  //     const newTodo = res?.data?.todo ?? res?.data;
  //     if (!newTodo) return;

  //     // flat list
  //     setAllToDos((prev) => [...prev, newTodo]);

  //     // grouped lists
  //     const listTitle = newTodo.list ?? 'unlisted';
  //     setLists((prev) =>
  //       prev.map((group) =>
  //         group.list === listTitle
  //           ? { ...group, data: [...group.data, newTodo] }
  //           : group
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [setLists]);

  // // PUT: update (mirror POST behavior for state updates)
  // const editToDo = useCallback(async (path, payload) => {
  //   try {
  //     const res = await axios.put(
  //       `${API_BASE}/todo/${encodeURIComponent(String(path || ''))}`,
  //       payload
  //     );
  //     const updated = res?.data?.todo ?? res?.data;
  //     if (!updated || !updated._id) return;

  //     // flat list
  //     setAllToDos((prev) => prev.map((t) => (t._id === updated._id ? { ...t, ...updated } : t)));

  //     // grouped lists — remove from any list, then add into its current list
  //     const targetList = updated.list ?? 'unlisted';
  //     setLists((prev) => {
  //       const next = prev.map((g) => ({ ...g, data: g.data.filter((t) => t._id !== updated._id) }));
  //       const idx = next.findIndex((g) => g.list === targetList);
  //       if (idx >= 0) {
  //         next[idx] = { ...next[idx], data: [...next[idx].data, updated] };
  //       } else {
  //         next.push({ list: targetList, data: [updated] });
  //       }
  //       return next;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [setLists]);

  // // DELETE one
  // const deleteToDo = useCallback(async (listName, id) => {
  //   try {
  //     await axios.delete(`${API_BASE}/todo/${encodeURIComponent(String(id || ''))}`);

  //     // flat list
  //     setAllToDos((prev) => prev.filter((t) => t._id !== id));

  //     // grouped lists
  //     const target = String(listName ?? 'unlisted');
  //     setLists((prev) =>
  //       prev.map((g) =>
  //         g.list === target ? { ...g, data: g.data.filter((t) => t._id !== id) } : g
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [setLists]);

  // // DELETE all for user (keeps your original behavior of clearing only allToDos)
  // const deleteAllToDos = useCallback(async (username) => {
  //   try {
  //     await axios.delete(`${API_BASE}/todo/delete/${encodeURIComponent(String(username || ''))}`);
  //     setAllToDos([]);
  //     console.log("All USER TODO's DELETED");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  

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
