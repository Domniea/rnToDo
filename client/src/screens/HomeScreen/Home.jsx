import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, ScrollView, TouchableWithoutFeedback,Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../context/UserProvider'
// import axios from 'axios'

import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import ToDo from '../../components/ToDo'
import PostToDo from '../PostToDo'
import { ToDoContext } from '../../context/ToDoProvider'



const Home = (props) => {
  
  const { height,width } = useWindowDimensions()

  const {
    user,
    handleSignOut
  } = useContext(UserContext)

  const {
    allToDos,
    // setAllToDos,
    getAllToDos,
    getUsersToDo,
    deleteToDo
  } = useContext(ToDoContext)

  const navigation = useNavigation()


  const{
    username,
  } = user

  useEffect(() => {
    // getAllToDos()
    getUsersToDo(username)
  }, [allToDos]) 


  const todo = allToDos.map((item, i) => {
    return <ToDo 
      key={i}
      title={item.title}
      _id={item._id}
      notes={item.description}
      onPress={() => deleteToDo(item._id)}
      navigation={navigation}
    />
    // return <Text key={i}>Test</Text>
  }) 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomButton text='Add ToDo' onPress={() => navigation.navigate(PostToDo,{navigation})}/>
        <Text style={styles.header}>ToDo's</Text>
        {/* <View style={styles.form}>
          <CustomInput 
          name='title'
          placeholder='What do you need to do?'
          control={control}
          rules={{
            required: 'Title is required'
          }}
          keyboardType="default"
          />
          <CustomButton 
          text='Submit'
          onPress={handleSubmit(onSubmitPress)}
           />
        </View> */}
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