// import React, {useEffect, useState, useContext, useRef} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Pressable,
// } from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
// import axios from 'axios';

// import {useTheme} from '@react-navigation/native';
// import {UserContext} from '../../context/UserProvider';
// import {OrientationContext} from '../../context/OrientationProvider';
// import {ListsContext} from '../../context/ListsProvider';

// import CustomButton from '../../components/CustomButton';
// import ToDo from '../../components/ToDo';
// import PostToDo from '../PostToDo';

// function ListScreen({navigation, index, listName, todoList}) {
//   const [dynamicList, setDynamicList] = useState(todoList);
//   const [addToDoVisible, setAddToDoVisible] = useState(false);

//   const panRef = useRef(null);
//   const scrollRef = useRef(null);

//   const {orientation, windowWidth, windowHeight} =
//     useContext(OrientationContext);

//   const {user} = useContext(UserContext);

//   const {username} = user;

//   const {lists, setLists, setHomeList, toRouteName} = useContext(ListsContext);

//   const listIndex = lists.findIndex(l => l.list === listName);

//   function toggleAddToDo() {
//     setAddToDoVisible(prevState => !addToDoVisible);
//   }

//   const {colors} = useTheme();

//   // POST Todo
//   async function submitTask(path, userData) {
//     try {
//       console.log('list', lists.data);
//       const res = await axios.post(
//         `https://rntodo-production.up.railway.app/todo/${path}`,
//         userData,
//       );
//       console.log('path', path);
//       // const res = await axios.post(`http://localhost:9000/todo/${path}`, userData)
//       setDynamicList(prevState => {
//         return [...prevState, res.data.todo];
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // EDIT todo
//   async function editTask(id, userData) {
//     try {
//       const data = await axios.put(
//         `https://rntodo-production.up.railway.app/todo/${id}`,
//         userData,
//       );
//       // const data = await axios.put(`http://localhost:9000/todo/${path}`, userData)

//       setDynamicList(prevState => {
//         return prevState.map(task => {
//           return task._id !== id ? task : data.data;
//         });
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // DELETE todo
//   async function deleteTask(id) {
//     try {
//       console.log(id);
//       const data = await axios.delete(
//         `https://rntodo-production.up.railway.app/todo/${id}`,
//       );
//       // const data = await axios.delete(`http://localhost:9000/todo/${id}`)

//       setDynamicList(prevState => {
//         return prevState.filter(todo => {
//           return todo._id !== id;
//         });
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   function deleteList(id) {
//     const prev = lists;
//     if (!Array.isArray(prev) || id < 0 || id >= prev.length) return;

//     const deleting = prev[id];
//     const next = prev.filter((_, i) => i !== id);

//     const targetRoute = next.length
//       ? toRouteName(next[Math.min(id, next.length - 1)].list)
//       : 'CreateList';

//     navigation.navigate(targetRoute);

//     // 2) Remove the deleted tab on the next frame
//     requestAnimationFrame(() => {
//       setLists(next);
//       setHomeList(targetRoute);
//     });

//     (async () => {
//       try {
//         const name = deleting?.list ?? 'undefined';
//         const seg = s => encodeURIComponent(String(s ?? ''));
//         const url =
//           name === 'unlisted'
//             ? `https://rntodo-production.up.railway.app/todo/delete/${seg(
//                 username,
//               )}/undefined`
//             : `https://rntodo-production.up.railway.app/todo/delete/${seg(
//                 username,
//               )}/${seg(name)}/test`;
//         await axios.delete(url);
//       } catch (err) {
//         console.log('Delete failed:', err?.message || err);
//       }
//     })();
//   }

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View
//         style={
//           orientation === 'PORTRAIT'
//             ? styles.container
//             : styles.containerLANDSCAPE
//         }>
//         {listName !== 'unlisted' && (
//           <CustomButton
//             text="Add ToDo"
//             onPress={toggleAddToDo}
//             // style={styles.test}
//             btnMargin={0}
//           />
//         )}
//         <Text style={[{color: colors.text}, styles.header]}>{listName}</Text>
//         {addToDoVisible && (
//           <PostToDo
//             listName={listName}
//             fromToggle="fromToggle"
//             toggleModal={toggleAddToDo}
//             setAddToDoVisible={setAddToDoVisible}
//             submitTask={submitTask}
//           />
//         )}

//         <View
//           style={
//             orientation === 'PORTRAIT'
//               ? {height: '80%', width: '100%'}
//               : {height: '50%', width: '100%'}
//           }>
//           <FlatList
//             nestedScrollEnabled={true}
//             scrollEnabled={true}
//             data={dynamicList}
//             keyExtractor={item => item._id.toString()}
//             ref={scrollRef}
//             simultaneousHandlers={panRef}
//             renderItem={({item}) => {
//               const {_id, description, ...rest} = item;
//               return (
//                 <ToDo
//                   title={item.title}
//                   notes={description}
//                   deleteToDo={deleteTask}
//                   navigation={navigation}
//                   panRef={panRef}
//                   scrollRef={scrollRef}
//                   listName={listName}
//                   editTask={editTask}
//                   _id={_id}
//                   {...rest}
//                 />
//               );
//             }}
//           />
//         </View>
//         <Pressable
//           onPress={() => deleteList(listIndex)}
//         >
//           <Text
//             style={[
//               listName === 'unlisted'
//                 ? {paddingTop: '15%'}
//                 : {paddingTop: '5%'},
//               {color: '#007AFF'},
//             ]}>
//             Delete List
//           </Text>
//         </Pressable>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// export default ListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     margin: '10%',
//   },
//   containerLANDSCAPE: {
//     flex: 1,
//     alignItems: 'center',
//     marginHorizontal: '10%',
//     marginVertical: '2%',
//   },
//   header: {
//     fontSize: 40,
//     margin: '3%',
//   },
//   form: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   deleteButton: {},
// });


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

// centralize API base + URI encoder
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
    if (!Array.isArray(prev) || id < 0 || id >= prev.length) return;

    const deleting = prev[id];
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
        const url =
          name === 'unlisted'
            ? `${API_BASE}/todo/delete/${seg(username)}/undefined`
            : `${API_BASE}/todo/delete/${seg(username)}/${seg(name)}`;
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
