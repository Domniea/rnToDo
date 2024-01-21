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
import TestModal from '../../components/TestModal'
import { Button } from '@aws-amplify/ui-react-native/dist/primitives'



const Home = (props) => {
  
  const { height,width } = useWindowDimensions()

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

  const [modalShown, setModalShown] = useState(false)

  function toggleModal() {
    setModalShown(prevState => !prevState)
  }

  useEffect(() => {
    getUsersToDo(username)
  }, [allToDos.length]) 

  console.log(modalShown)

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
        <CustomButton text='Add ToDo' onPress={() => navigation.navigate(PostToDo,{navigation})}/>
        <CustomButton onPress={() => toggleModal()} text='test'  />
        <Text style={styles.header}>ToDo's</Text>
      <View style={[{height: height * .6}, {width: width * .8}]}>
       { modalShown && <TestModal test='boobs' toggleModal={toggleModal}/> }
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