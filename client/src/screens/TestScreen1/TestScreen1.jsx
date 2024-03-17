import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback,
    Keyboard,
    Button
  } from 'react-native'
import {
  FlatList,
  ScrollView
} from 'react-native-gesture-handler'

import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'
import { ToDoContext } from '../../context/ToDoProvider'
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
    goBack
  } = params

  const dynamicList = todoList
  const listName = name

  const [testState, setTestState] = useState(dynamicList)

  const panRef = useRef(null)
  const scrollRef= useRef(null)

  // const navigation = useNavigation()

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
    test,
    lists,
    setLists,
    getUsersLists,
    setHomeList
  } = useContext(ListsContext)

  const {
    allToDos,
    getUsersToDo,
    deleteToDo
  } = useContext(ToDoContext)

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
        // const res = await axios.post(`http://localhost:9000/todo/${path}`, userData)

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
  setHomeList(lists[0].list)
  try {
      const data = await axios.delete(`https://rntodo-production.up.railway.app/todo/${username}/${listName}`)
      // const data = await axios.delete(`http://localhost:9000/todo/${username}/${listName}`)
      console.log(data.data)
      
      setLists(prevState => {
       
        console.log(lists)
        return prevState.filter(list => {
          console.log( typeof list.list)
          if(list.list !== 'undefined'){
            return list.list !== listName
          } else {
            return list.list === 'undefined'
          }
          
        })
      })
  }
  catch(error) {
      console.log(error)
  }
}





  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={ orientation === 'PORTRAIT' ? styles.container : styles.containerLANDSCAPE }>
        <CustomButton 
          text='Add ToDo' 
          onPress={toggleAddToDo}
          style={styles.test}
          btnMargin={0}
        />
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
            keyExtractor={(item, id) => id}
            ref={scrollRef}
            simultaneousHandlers={panRef}
    
            renderItem={({item}) => <ToDo
              key={item._id}
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
      
        {/* <CustomButton 
          text='Delete List' 
          onPress={() =>testGetToDelete(username)}
          style={styles.test}
          btnMargin={0}
        /> */}
        <Button title='test' onPress={deleteList}/>

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
  }




})