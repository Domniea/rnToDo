import { StyleSheet, 
Platform
} from 'react-native'
import React, { useEffect, useContext } from 'react'
import { Hub } from 'aws-amplify/utils';
import { Appearance } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';




import { UserContext } from '../context/UserProvider';
import { OrientationContext } from '../context/OrientationProvider';
import { ThemeContext } from '../context/ThemeProvider';
import { ListsContext } from '../context/ListsProvider';

//Navigator
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';

//Screens for Navigator
import SignIn from '../screens/SignInScreen/SignIn';
import CreateAccount from '../screens/CreateAccountScreen/CreateAccount';
import ConfirmEmail from '../screens/ConfirmEmailScreen/ConfirmEmail';
import ResetPassword from '../screens/ResetPasswordScreen/ResetPassword';
import ForgotPaassword from '../screens/ForgotPaassword';
import Home from '../screens/HomeScreen/Home';
import CreateList from '../screens/CreateList';

import PostToDo from '../screens/PostToDo';
import ToDoDescription from '../screens/ToDoDetails/ToDoDetails';
import Preferences from '../screens/Preferences';
import EditPassword from '../screens/EditPassword';
import SignUpComplete from '../screens/SignUpComplete';
import TestScreen1 from '../screens/TestScreen1';
import TestScreen2 from '../screens/TestScreen2';


const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const {
    user, 
    setUser, 
    checkUser
  } = useContext(UserContext)
  
  const {
    theme
  } = useContext(ThemeContext)

  const {
    test,
    lists,
    setLists,
    homeList
  } = useContext(ListsContext)

  const {
    orientation,
    windowWidth,
    windowHeight
  } = useContext(OrientationContext)


  //Deep Linking
  const linking = {
    prefixes: ['todoapp://'],
    config: {
      initialRouteName: 'home',
      screens:{
        TestScreen: 'test/boob',
        Home: 'home',
        PostToDo: 'post'
      }
    }
  }
  
  function TabView() {
    const Tab = createMaterialTopTabNavigator();
    console.log('tabin')
    return (
      <Tab.Navigator
      tabBarPosition='bottom'
      // initialRouteName={'CreateList'}
      // backBehavior={'history'}
      screenOptions={{
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        tabBarStyle: {paddingBottom: 20, paddingTop: 10},
        lazy: false
      }}
      initialLayout={{ width: windowWidth}}
      >
        <Tab.Screen name="CreateList" component={CreateList} />
        {
        lists && ! !lists.length &&
          lists.map((listArr,i) => {
          if(listArr.list !== undefined){
            return <Tab.Screen 
            key={listArr.list + i} 
            name={listArr.list} 
            component={TestScreen1}
            initialParams={{todoList: listArr.data}}
          />
          } else {
            return <Tab.Screen 
            key={i} 
            name={'undefined'} 
            component={TestScreen1}
            initialParams={{todoList: listArr.data}}
          />
          }
        })
   }
      </Tab.Navigator>
    );
  }

  //Right Swipe in Drawer
  function RightDrawer() {
      const testList = lists.map((listArr,i) => {
      return <Drawer.Screen 
        key={listArr[0].list + i} 
        name={listArr[0].list} 
        component={TestScreen1}
        initialParams={{todoList: listArr, goHome}}
      />
    })

    return (
      <Drawer.Navigator
        screenOptions={
          Platform.OS === 'android' && theme === 'dark' ? 
          {headerTintColor: 'white', drawerPosition: 'right', headerLeft: false, headerRight: () => <DrawerToggleButton/>} : 
          {drawerPosition: 'right', headerLeft: false, headerRight: () => <DrawerToggleButton/>}
          }
      >
        <Drawer.Screen
          name="ALL" 
          component={Home}
          />

        {testList}

        {/* <Drawer.Screen 
          name="Preferences" 
          component={Preferences} 
        /> */}
      </Drawer.Navigator>
    );
  }

  //Main App Drawer
  function LeftDrawer() {
    console.log('left drawer')
    return (
      <Drawer.Navigator
        screenOptions={
          Platform.OS === 'android' && theme === 'dark' ? {headerTintColor: 'white'} : {}
          }
      >
        <Drawer.Screen
          name="Lists" 
          component={TabView}
          />
        <Drawer.Screen 
          name="Preferences" 
          component={Preferences} 
        />
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








  return (
    <NavigationContainer 
      theme={theme === 'dark' ? DarkTheme : DefaultTheme} 
      linking={linking}
    >
      {/* <ToDoProvider> */}
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}
        >
          {
            user ? (
              <>
              <Stack.Group>
                <Stack.Screen 
                  name='LeftDrawer' 
                  component={LeftDrawer} 
                  options={{title: 'The Best ToDo List'}}
                />
                 {/* <Stack.Screen 
                  name='RightDrawer' 
                  component={RightDrawer} 
                  options={{title: 'The Best ToDo List'}}
                /> */}
                <Stack.Screen 
                  name='EditPassword' 
                  component={EditPassword} 
                  options={{
                    drawerItemStyle: {display: 'none'}
                  }}
                />
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
        {/* </ToDoProvider> */}
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})