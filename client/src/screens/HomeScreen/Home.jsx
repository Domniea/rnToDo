import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, ScrollView, TouchableWithoutFeedback,Keyboard, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../context/UserProvider'
// import axios from 'axios'

import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import ToDo from '../../components/ToDo'
import PostToDo from '../PostToDo'
import { ToDoContext } from '../../context/ToDoProvider'
import ToDoDetails from '../ToDoDetails/ToDoDetails'



const Home = (props) => {

  const [addToDoVisible, setAddToDoVisible] = useState(false)
  const {detailsVisible, setDetailsVisible} = useState(false)

  const { height,width } = useWindowDimensions()

  function toggleAddToDo(){
    setAddToDoVisible(prevState => !addToDoVisible)
  }

  function toggleDetails() {
    setDetailsVisible(prevState => !prevState)
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

  const navigation = useNavigation()

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

  // console.log(modalShown)

  const todo = allToDos.map((item, i) => {
    return <ToDo 
      key={i}
      title={item.title}
      _id={item._id}
      notes={item.description}
      onPress={() => submitDelete(item._id)}
      navigation={navigation}
    />
    // return <Text key={i}>Test</Text>
  }) 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      {/* <CustomButton
            text='test'
            onPress={() => navigation.navigate('TestScreen')}
          /> */}
        <CustomButton text='Add ToDo' onPress={toggleAddToDo}/>
        <Text style={styles.header}>ToDo's</Text>
       { addToDoVisible && <PostToDo  fromToggle='fromToggle' toggleModal={toggleAddToDo}/> }
       {/* { addToDoVisible && <ToDoDetails toggleModal={toggleDetails}/> } */}
      <View style={[{height: height * .6}, {width: width * .8}]}>
        <ScrollView >
          <View style={[styles.list]}>
            {todo}
          </View>
        </ScrollView>  
      </View>

        <View style={styles.footer}>
          <CustomButton
            text='Log Out'
            onPress={handleSignOut}
          />
        </View>
      
      </View>

  </TouchableWithoutFeedback>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    margin: '10%'
  },
  header: {
    fontSize: 40,
    margin: 15
  },
  form: {
    alignItems: 'center',
    width: '100%'
  },
  list:{
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  }

})