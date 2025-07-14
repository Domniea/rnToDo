import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    Pressable
  } from 'react-native'
import {
  FlatList
} from 'react-native-gesture-handler'

import axios from 'axios'

import { useTheme } from '@react-navigation/native'
import { UserContext } from '../../context/UserProvider'
import { OrientationContext } from '../../context/OrientationProvider'
import { ListsContext } from '../../context/ListsProvider'


import CustomButton from '../../components/CustomButton'
import ToDo from '../../components/ToDo'
import PostToDo from '../PostToDo'

const TestScreen1 = ({route, navigation}) => {
  const {
    key,
    name,
    params
      } = route

  const {
    todoList,
  } = params


  const dynamicList = todoList
  const listName = name

  const [testState, setTestState] = useState(dynamicList)

  const panRef = useRef(null)
  const scrollRef= useRef(null)

  const {
    orientation,
    windowWidth,
    windowHeight
  } = useContext(OrientationContext)

  const {
    user
  } = useContext(UserContext)

  const{
    username,
  } = user

  const {
    lists,
    setLists,
    setHomeList
  } = useContext(ListsContext)



  const [addToDoVisible, setAddToDoVisible] = useState(false)

  function toggleAddToDo(){
    setAddToDoVisible(prevState => !addToDoVisible)
  }

  const {
    colors
  } = useTheme()


  //POST Todo
  async function testSubmit(path, userData) {
    try {
        const res = await axios.post(`https://rntodo-production.up.railway.app/todo/${path}`, userData)
        console.log('path', path)
        // const res = await axios.post(`http://localhost:9000/todo/${path}`, userData)
      console.log(path)
        setTestState(prevState => {
          return [
            ...prevState,
            res.data.todo
          ]
        })
    }
    catch(error) {
    console.log(error)
    }
}

//EDIT todo
async function testEdit(id, userData) {
  try {
      const data = await axios.put(`https://rntodo-production.up.railway.app/todo/${id}`, userData)
      // const data = await axios.put(`http://localhost:9000/todo/${path}`, userData)

      setTestState(prevState => {
        return prevState.map(task => {
          return task._id !== id ?
                task :
                data.data
          } 
        )
      })
  }
  catch(error) {
      console.log(error)
  }
}


//DELETE todo
async function testDelete(id) {
       
  console.log('deleted')
  try {
      const data = await axios.delete(`https://rntodo-production.up.railway.app/todo/${id}`)
      // const data = await axios.delete(`http://localhost:9000/todo/${id}`)

      setTestState(prevState => {
       return  prevState.filter( todo => {
           return todo._id !== id 
        })
      })
  }
  catch(error) {
      console.log(error)
  }
}





async function deleteList() {
  if(lists[0].list) {
      setHomeList(prevState=> {
      return lists[0].list
    })
    } else {
      setLists('CreateList')
    }
 

  try {
      // const data = await axios.delete(`https://rntodo-production.up.railway.app/todo/${username}/${listName}`)
      if(listName !== 'Un-Listed'){
        const data = await axios.delete(`https://rntodo-production.up.railway.app/todo/delete/${username}/${listName}/test`)
        // const data = await axios.find(`http://localhost:9000/todo/delete/${username}/${listName}/test`)
        // console.log('first', data.data)
      } else if(listName === 'Un-Listed' || undefined) {
        const data = await axios.delete(`https://rntodo-production.up.railway.app/todo/delete/${username}/undefined`)
        // const data = await axios.find(`http://localhost:9000/todo/delete/${username}/undefined`)
        // console.log('second', data.data)
      }
      console.log(lists.length)
  lists.length > 1 ?
    setLists(prevState => {
      return prevState.filter(list => {
        if(list.list !== undefined){
          return list.list !== listName
        } else if (list.list === 'Un-Listed') {
          return list.list !== 'Un-Listed' || undefined
        }

      })
    })
    :
    setLists([])
  }
  catch(error) {
      console.log(error)
  }
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={ orientation === 'PORTRAIT' ? styles.container : styles.containerLANDSCAPE }>
    {
      (listName !== 'Un-Listed' ) &&
          <CustomButton 
          text='Add ToDo' 
          onPress={toggleAddToDo}
          style={styles.test}
          btnMargin={0}
        />
    }
        <Text style={[{color: colors.text}, styles.header]}>{listName}</Text>
       {
         addToDoVisible && 
          <PostToDo
            listName={listName}
            fromToggle='fromToggle' 
            toggleModal={toggleAddToDo} 
            setAddToDoVisible={setAddToDoVisible}
            testSubmit={testSubmit}
            setTestState={setTestState}
          />
        }
     

        <View style={orientation === 'PORTRAIT' ? {height: '80%', width: '100%'} : {height: '50%', width: '100%'}}> 


     
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={true}
            data={testState}
            extraData={dynamicList}
            // keyExtractor={(item, id) => id}
            keyExtractor={(item) => item._id.toString()}
            ref={scrollRef}
            simultaneousHandlers={panRef}
    
            renderItem={({item}) => <ToDo
              // key={item._id}
              {...item}
              notes={item.description}
              deleteToDo={testDelete}
              navigation={navigation}
              panRef={panRef}
              scrollRef={scrollRef}
              listName={listName}
              testEdit={testEdit}
              />
            }

          />
        </View>
        <Pressable
        onPress={deleteList}
        style={{color: 'green'}}
      >
          <Text style={[listName === 'Un-Listed' ? {paddingTop: '15%'} : {paddingTop:'5%'}, { color: '#007AFF'}]}>Delete List</Text>
      </Pressable>
      

      </View >

  </TouchableWithoutFeedback>

  )
}

export default TestScreen1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: '10%'
  },
  containerLANDSCAPE: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '2%'
  },
  header: {
    fontSize: 40,
    margin: '3%'
  },
  test: {
    backgroundColor: 'green',
    width: 20
  },
  form: {
    alignItems: 'center',
    width: '100%'
  },
  deleteButton: {
  
  }
})