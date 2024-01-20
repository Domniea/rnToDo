import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Hub } from 'aws-amplify/utils';


import SignIn from '../screens/SignInScreen/SignIn';
import CreateAccount from '../screens/CreateAccountScreen/CreateAccount';
import ConfirmEmail from '../screens/ConfirmEmailScreen/ConfirmEmail';
import ResetPassword from '../screens/ResetPasswordScreen/ResetPassword';
import ForgotPaassword from '../screens/ForgotPaassword';
import Home from '../screens/HomeScreen/Home';
import PostToDo from '../screens/PostToDo';
import ToDo from '../components/ToDo'
import ToDoDescription from '../screens/ToDoDescription/ToDoDescription';

import { UserContext } from '../context/UserProvider';
import { ToDoProvider } from '../context/ToDoProvider';



const Stack = createNativeStackNavigator();

const Navigation = () => {

  const {user, setUser, checkUser} = useContext(UserContext)
    
    
  useEffect(() => {
    function listener(data) {
      if (data.payload.event === 'signedIn') {
        checkUser()
      }
      console.log(data.payload.event)
    }

    Hub.listen('auth', listener)
    return () => Hub.remove('auth', listener)
  }, [])

  useEffect(() => {
    function listener(data) {
      if (data.payload.event === 'signedOut') {
        setUser(undefined)
      }
      console.log(data.payload.event)
    }

    Hub.listen('auth', listener)
    return () => Hub.remove('auth', listener)
  }, [])

  console.log(user)

  return (
    <NavigationContainer>
      <ToDoProvider>
        <Stack.Navigator>
          {
            user ? (
              <Stack.Group>
                <Stack.Screen 
                  name='Home' 
                  component={Home} 
                  user={user}
                  options={{title: 'Welcome'}}
                />
                {/* <Stack.Screen name='ToDo' component={ToDo}/> */}
                <Stack.Screen 
                  name='PostToDo' 
                  component={PostToDo} 
                  options={{
                    presentation: 'modal', 
                    title: 'Add a todo'
                  }}
                />
                <Stack.Screen 
                  name='ToDoDescription' 
                  component={ToDoDescription} 
                  options={({route}) => 
                  ({ presentation: 'modal', 
                  title: `${route.params.title} Details`})
                }
           
                />
              </Stack.Group>

            )
              :

              (
                <>
                  <Stack.Screen name='SignIn' component={SignIn} />
                  <Stack.Screen name='CreateAccount' component={CreateAccount} />
                  <Stack.Screen name='ConfirmEmail' component={ConfirmEmail} />
                  <Stack.Screen name='ForgotPassword' component={ForgotPaassword} />
                  <Stack.Screen name='ResetPassword' component={ResetPassword} />
                </>
              )
          }
        </Stack.Navigator>
        </ToDoProvider>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})