import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollViewBase } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { signOut } from 'aws-amplify/auth'
import { UserContext } from '../../context/UserProvider'
import axios from 'axios'

import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import ToDo from '../../components/ToDo'



const Home = (props) => {
  
  const { user } = useContext(UserContext)

  const navigation = useNavigation()


  const{
    username,
    userId
  } = user

  const {control, handleSubmit} = useForm()

  const [ allToDos, setAllToDos] = useState([])

  async function getAllToDos() {
    try{
      const data = await axios.get('http://localhost:9000/todo/')
      setAllToDos(data.data)
    }
    catch(error) {
      console.log(error)
    }
  }
  
  async function submitToDo(data) {
    try {
      const response = await axios.post(`http://localhost:9000/todo/${username}`, data)
      console.log(response)
      setAllToDos(prevState => {
        return [...prevState,
        response]
      })
    }
    catch(error) {
      console.log(error)
    }
  }

  function onSubmitPress(data) {
    submitToDo(data)
    console.log('input', data)
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  

  useEffect(() => {
    getAllToDos()
  }, [allToDos]) 


  const todo = allToDos.map((item, i) => {
    return <ToDo 
      key={i}
      title={item.title}
    />
  }) 

  return (
    <View style={styles.container}>
 
      <Text style={styles.header}>Home Page</Text>
      <View style={styles.form}>
        <CustomInput 
          name='title'
          placeholder='What do you need to do?'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        />
        
        {/* <CustomInput 
          name='description'
          placeholder='* Notes'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        /> */}
        {/* <CustomInput 
          name='title'
          placeholder='What do you need to do?'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        /> */}
        <CustomButton 
          text='Submit'
          onPress={handleSubmit(onSubmitPress)}
        />
      </View>

      {/* <ScrollViewBase> */}
        <View style={styles.list}>
          {todo}
        </View>
      {/* </ScrollViewBase>   */}

      <View style={styles.footer}>
        <CustomButton
          text='Log Out'
          onPress={handleSignOut}

        />
      </View>
    
    </View>
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