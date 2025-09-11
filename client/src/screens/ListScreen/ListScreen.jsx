import React, {useEffect, useState, useContext, useRef, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';

import {useTheme} from '@react-navigation/native';
import {UserContext} from '../../context/UserProvider';
import {OrientationContext} from '../../context/OrientationProvider';
import {ListsContext} from '../../context/ListsProvider';

import CustomButton from '../../components/CustomButton';
import ToDo from '../../components/ToDo';
import PostToDo from '../PostToDo';

const API_BASE = 'https://rntodo-production.up.railway.app';
const seg = (v) => encodeURIComponent(String(v ?? ''));

function ListScreen({navigation, index, listName, todoList}) {
  const initialList = Array.isArray(todoList) ? todoList : [];
  const [dynamicList, setDynamicList] = useState(initialList);
  const [addToDoVisible, setAddToDoVisible] = useState(false);

  const panRef = useRef(null);
  const scrollRef = useRef(null);

  const {orientation} = useContext(OrientationContext);
  const {user} = useContext(UserContext);
  const {lists, setLists, setHomeList, toRouteName} = useContext(ListsContext);

  const {colors} = useTheme();

  const username = useMemo(() => (user && user.username ? String(user.username) : ''), [user]);

  const listIndex = useMemo(() => {
    if (!Array.isArray(lists)) return -1;
    return lists.findIndex(l => l.list === listName);
  }, [lists, listName]);

  const listContainerStyle = useMemo(
    () =>
      orientation === 'PORTRAIT'
        ? {height: '80%', width: '100%'}
        : {height: '50%', width: '100%'},
    [orientation]
  );

  function toggleAddToDo() {
    setAddToDoVisible(prev => !prev);
  }

  // POST todo
  async function submitTask(path, userData) {
    if (!path) return;
    try {
      const res = await axios.post(`${API_BASE}/todo/${seg(path)}`, userData);
      setDynamicList(prev => [...prev, res.data?.todo]);
    } catch (error) {
      console.log(error);
    }
  }

  // EDIT todo
  async function editTask(id, userData) {
    if (!id) return;
    try {
      const {data} = await axios.put(`${API_BASE}/todo/${seg(id)}`, userData);
      setDynamicList(prev => prev.map(task => (task._id !== id ? task : data)));
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE todo
  async function deleteTask(id) {
    if (!id) return;
    try {
      await axios.delete(`${API_BASE}/todo/${seg(id)}`);
      setDynamicList(prev => prev.filter(todo => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE list
  function deleteList(id) {
    const prev = lists;
    console.log(prev)
    if (!Array.isArray(prev) || id < 0 || id >= prev.length) return;

    const deleting = prev[id];
    console.log(deleting)
    const next = prev.filter((_, i) => i !== id);

    const targetRoute = next.length
      ? toRouteName(next[Math.min(id, next.length - 1)].list)
      : 'CreateList';

    navigation.navigate(targetRoute);

    requestAnimationFrame(() => {
      setLists(next);
      setHomeList(targetRoute);
    });

    (async () => {
      try {
        const name = deleting?.list ?? 'undefined';
        console.log(seg(name))
        const url =
          name === 'unlisted'
            ? `${API_BASE}/todo/delete/${seg(username)}/undefined`
            : `${API_BASE}/todo/delete/${seg(username)}/${seg(name)}/test`;
        await axios.delete(url);
      } catch (err) {
        console.log('Delete failed:', err?.message || err);
      }
    })();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={
          orientation === 'PORTRAIT'
            ? styles.container
            : styles.containerLANDSCAPE
        }>
        {listName !== 'unlisted' && (
          <CustomButton text="Add ToDo" onPress={toggleAddToDo} btnMargin={0} />
        )}

        <Text style={[{color: colors.text}, styles.header]}>{listName}</Text>

        {addToDoVisible && (
          <PostToDo
            listName={listName}
            fromToggle="fromToggle"
            toggleModal={toggleAddToDo}
            setAddToDoVisible={setAddToDoVisible}
            submitTask={submitTask}
          />
        )}

        <View style={listContainerStyle}>
          <FlatList
            nestedScrollEnabled
            scrollEnabled
            data={dynamicList}
            keyExtractor={item => item._id.toString()}
            ref={scrollRef}
            simultaneousHandlers={panRef}
            renderItem={({item}) => {
              const {_id, description, ...rest} = item;
              return (
                <ToDo
                  title={item.title}
                  notes={description}
                  deleteToDo={deleteTask}
                  navigation={navigation}
                  panRef={panRef}
                  scrollRef={scrollRef}
                  listName={listName}
                  editTask={editTask}
                  _id={_id}
                  {...rest}
                />
              );
            }}
          />
        </View>

        <Pressable onPress={() => deleteList(listIndex)}>
          <Text
            style={[
              listName === 'unlisted'
                ? {paddingTop: '15%'}
                : {paddingTop: '5%'},
              {color: '#007AFF'},
            ]}>
            Delete List
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: '10%',
  },
  containerLANDSCAPE: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '2%',
  },
  header: {
    fontSize: 40,
    margin: '3%',
  },
  form: {
    alignItems: 'center',
    width: '100%',
  },
  deleteButton: {},
});
