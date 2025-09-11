import React, {useState, createContext, useEffect, useContext, useMemo} from 'react';
import axios from 'axios';
import {UserContext} from './UserProvider';

export const ListsContext = createContext();

export function ListsProvider({children}) {
  const { user } = useContext(UserContext);
  const [lists, setLists] = useState([]);
  const [homeList, setHomeList] = useState('CreateList');

  function getSections(data) {
    return Object.values(
      data.reduce((result, todo) => {
        const listName = todo.list;
        if (!result[listName]) {
          result[listName] = { list: listName ?? 'unlisted', data: [todo] };
        } else {
          result[listName].data.push(todo);
        }
        return result;
      }, {})
    );
  }

  async function getUsersLists(username) {
    if (!username) {
      setLists([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://rntodo-production.up.railway.app/todo/${encodeURIComponent(username)}`
      );
      setLists(getSections(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  function toRouteName(title) {
    const base = String(title ?? '').trim().toLowerCase();
    if (!base) return 'list-unlisted';
    const cleaned = base
      .normalize('NFKD')
      .replace(/[^\p{L}\p{N}]+/gu, '_')
      .replace(/^_+|_+$/g, '');
    return `list-${cleaned || 'unlisted'}`;
  }

  // Refetch lists whenever the signed-in user changes
  useEffect(() => {
    const username = user && user.username ? String(user.username) : undefined;
    getUsersLists(username);
  }, [user]);

  const value = useMemo(() => ({
    lists,
    setLists,
    homeList,
    setHomeList,
    getUsersLists,
    toRouteName,
  }), [lists, homeList]);

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>;
}
