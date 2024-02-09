import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, ScrollView, TouchableWithoutFeedback,Keyboard, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../context/UserProvider'

import CustomButton from '../../components/CustomButton'

import ToDo from '../../components/ToDo'
import PostToDo from '../PostToDo'
import { ToDoContext } from '../../context/ToDoProvider'



const Home = (props) => {

  const navigation = useNavigation()

  const [addToDoVisible, setAddToDoVisible] = useState(false)

  const { height, width } = useWindowDimensions()

  function toggleAddToDo(){
    setAddToDoVisible(prevState => !addToDoVisible)
  }

  const {
    user,
    handleSignOut
  } = useContext(UserContext)

  const {
    allToDos,
    getUsersToDo,
    deleteToDo
  } = useContext(ToDoContext)

  function submitDelete(id) {
    deleteToDo(id)
    getUsersToDo(username)
  }

  const{
    username,
  } = user

  useEffect(() => {
    getUsersToDo(username)
  }, [allToDos.length]) 

  const todo = allToDos.map((item, i) => {
    return <ToDo 
      key={i}
      title={item.title}
      _id={item._id}
      notes={item.description}
      onPress={() => submitDelete(item._id)}
      navigation={navigation}
    />
  }) 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={ height >= 500 ? styles.container : styles.containerLANDSCAPE }>

        <CustomButton 
          text='Add ToDo' 
          onPress={toggleAddToDo}
          style={styles.test}
          btnMargin={0}
        />
        <Text style={styles.header}>ToDo's</Text>
       {
         addToDoVisible && 
          <PostToDo 
            fromToggle='fromToggle' 
            toggleModal={toggleAddToDo} 
            setAddToDoVisible={setAddToDoVisible}
          />
        }
       
        <View 
          style={
              [{height: height * .6}, 
              {width: width * .8}]
            }
        >
          <ScrollView >
            <View style={[styles.list]}>
              {todo}
            </View>
          </ScrollView>  
        </View>

        <View style={styles.footer}>
        </View>
      
      </View>

  </TouchableWithoutFeedback>

  )
}

export default Home

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
    margin: 15
  },
  test: {
    color: 'green'
  },
  form: {
    alignItems: 'center',
    width: '100%'
  },
  list:{
  }

})