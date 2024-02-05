import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { Hub } from 'aws-amplify/utils';
import { Appearance } from 'react-native';


import { UserContext } from '../context/UserProvider';
import { ToDoProvider } from '../context/ToDoProvider';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Screens for Navigator
import SignIn from '../screens/SignInScreen/SignIn';
import CreateAccount from '../screens/CreateAccountScreen/CreateAccount';
import ConfirmEmail from '../screens/ConfirmEmailScreen/ConfirmEmail';
import ResetPassword from '../screens/ResetPasswordScreen/ResetPassword';
import ForgotPaassword from '../screens/ForgotPaassword';
import Home from '../screens/HomeScreen/Home';
import PostToDo from '../screens/PostToDo';
import ToDoDescription from '../screens/ToDoDetails/ToDoDetails';
import Preferences from '../screens/Preferences';
import SignUpComplete from '../screens/SignUpComplete';
import TestScreen from '../screens/TestScreen';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const {user, setUser, checkUser} = useContext(UserContext)
  
  // console.log(Appearance)

  
  
  //Deep Linking
  const linking = {
    prefixes: ['todoapp://'],
    config: {
      initialRouteName: 'TestScreen',
      screens:{
        TestScreen: 'test/boob',
        Home: 'home',
        PostToDo: 'post'
      }
    }
  }

  //Main App Drawer
  function MyDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home" 
          component={Home}
          />
        <Drawer.Screen name="Preferences" component={Preferences} />
      </Drawer.Navigator>
    );
  }

 //SignIn Listiner
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

  //SignOut Listener
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

  const scheme = useColorScheme();


  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme} linking={linking}>
      <ToDoProvider>
        <Stack.Navigator >
          {
            user ? (
              <>
              <Stack.Group>
                 <Stack.Screen 
                  name='MyDrawer' 
                  component={MyDrawer} 
                  // user={user}
                  options={{title: 'The Best ToDo List'}}
                />
                 {/* <Stack.Screen 
                  name='Home' 
                  component={Home} 
                  // user={user}
                  options={{title: 'Welcome'}}
                /> */}
                {/* <Stack.Screen name='ToDo' component={ToDo}/> */}
                <Stack.Screen 
                  name='PostToDo' 
                  component={PostToDo} 
                  options={{
                    presentation: 'modal', 
                    title: 'Add a todo'
                  }}
                  initialParams={'test'}
                />
                <Stack.Screen 
                  name='ToDoDescription' 
                  component={ToDoDescription} 
                  options={({route}) => 
                  ({ presentation: 'modal', 
                  title: `${route.params.title} Details`,
                  })
                }
           
                />
              </Stack.Group>
           
             </>

            )
              :

              (
                <>
                  <Stack.Screen name='SignIn' component={SignIn} />
                  <Stack.Screen name='CreateAccount' component={CreateAccount} />
                  <Stack.Screen name='ConfirmEmail' component={ConfirmEmail} />
                  <Stack.Screen name='ForgotPassword' component={ForgotPaassword} />
                  <Stack.Screen name='ResetPassword' component={ResetPassword} />
                  <Stack.Screen name='SignUpComplete' component={SignUpComplete} />
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