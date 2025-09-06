import {StyleSheet, Text, View} from 'react-native';
import React, {useState, createContext, useContext, useEffect} from 'react';
import axios from 'axios';

import {UserContext} from './UserProvider';
import {storage} from '../Storage';

const ListsContext = createContext();

const ListsProvider = props => {
  const [lists, setLists] = useState([]);

  const [homeList, setHomeList] = useState('CreateList');

  const USERNAME = storage.getString('USERNAME');
    console.log('HERE', USERNAME)

  // Seperate Lists
  function getSections(data) {
    return Object.values(
      data.reduce((result, todo) => {
        const listName = todo.list;
        if (!result[listName]) {
          listName !== undefined
            ? (result[listName] = {list: listName, data: [todo]})
            : (result[listName] = {list: 'unlisted', data: [todo]});
        } else {
          result[listName].data.push(todo);
        }
        return result;
      }, []),
    );
  }

  // Get Lists Call
  async function getUsersLists(username) {
    try {
      const res = await axios.get(
        `https://rntodo-production.up.railway.app/todo/${username}`,
      );

      setLists(getSections(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  function toRouteName(title) {
    const base = String(title ?? '')
      .trim()
      .toLowerCase();
    if (!base) return 'unlisted';
    // Collapse any non letter/number into underscores, then trim redundant underscores
    const cleaned = base
      .normalize('NFKD')
      .replace(/[^\p{L}\p{N}]+/gu, '_')
      .replace(/^_+|_+$/g, '');
    return `list-${cleaned || 'unlisted'}`;
  }

  useEffect(() => {
    getUsersLists(USERNAME);
  }, []);

  return (
    <ListsContext.Provider
      value={{
        test: 'test',
        lists,
        homeList,
        setHomeList,
        setLists,
        getUsersLists,
        toRouteName,
      }}>
      {props.children}
    </ListsContext.Provider>
  );
};

export {ListsContext, ListsProvider};

const styles = StyleSheet.create({});
