import {StyleSheet, Platform} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {Hub} from 'aws-amplify/utils';
import {Appearance} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {UserContext} from '../context/UserProvider';
import {OrientationContext} from '../context/OrientationProvider';
import {ThemeContext} from '../context/ThemeProvider';
import {ListsContext, ListsProvider} from '../context/ListsProvider';

//Navigator
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';

//Screens for Navigator
import SignIn from '../screens/SignInScreen/SignIn';
import CreateAccount from '../screens/CreateAccountScreen/CreateAccount';
import ConfirmEmail from '../screens/ConfirmEmailScreen/ConfirmEmail';
import ResetPassword from '../screens/ResetPasswordScreen/ResetPassword';
import ForgotPaassword from '../screens/ForgotPaassword';
import CreateList from '../screens/CreateList';

import PostToDo from '../screens/PostToDo';
import ToDoDescription from '../screens/ToDoDetails/ToDoDetails';
import Preferences from '../screens/Preferences';
import EditPassword from '../screens/EditPassword';
import SignUpComplete from '../screens/SignUpComplete';
import TestScreen1 from '../screens/ListScreen';


const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user, setUser, checkUser} = useContext(UserContext);

  const {theme} = useContext(ThemeContext);

  const {test, lists, setLists, homeList} = useContext(ListsContext);

  const {orientation, windowWidth, windowHeight} =
    useContext(OrientationContext);

  //Deep Linking
  const linking = {
    prefixes: ['todoapp://'],
    config: {
      initialRouteName: 'home',
      screens: {
        TestScreen: 'test/boob',
        Home: 'home',
        PostToDo: 'post',
      },
    },
  };

  function TabView() {
    const Tab = createMaterialTopTabNavigator();

    function renderTabScreens() {
    return lists.map((listArr, idx) => {
      const hasListName = typeof listArr.list === 'string' && listArr.list.trim() !== '';
      const label = hasListName ? listArr.list : `Un-Listed-${idx}`;

      // Use a stable, unique internal route name. Show the label via options.title.
      const routeName = `list-${idx}`;

      return (
        <Tab.Screen
          key={routeName} 
          name={routeName}
          options={{ title: label }}
        >
          {() => (
            <TestScreen1
              todoList={listArr.data}
              listId={idx}
              listName={listArr.list}
            />
          )}
        </Tab.Screen>
      );
    });
  }

    return (
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName={homeList}
        backBehavior="history"
        screenOptions={{
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarStyle: {paddingBottom: 20, paddingTop: 10},
        }}
        initialLayout={{width: windowWidth}}>
        <Tab.Screen
          name="CreateList"
          component={CreateList}
          initialParams={{todoList: lists}}
        />
        {renderTabScreens()}
      </Tab.Navigator>
    );
  }

  //Main App Drawer
  function LeftDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={
          Platform.OS === 'android' && theme === 'dark'
            ? {headerTintColor: 'white'}
            : {}
        }>
        <Drawer.Screen name="Lists">
          {() => {
            return <TabView />;
          }}
        </Drawer.Screen>
        <Drawer.Screen name="Preferences" component={Preferences} />
      </Drawer.Navigator>
    );
  }

  //SignIn Listiner
  useEffect(() => {
    function listener(data) {
      if (data.payload.event === 'signedIn') {
        checkUser();
      }
      console.log(data.payload.event);
    }

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  //SignOut Listener
  useEffect(() => {
    function listener(data) {
      if (data.payload.event === 'signedOut') {
        setUser(undefined);
      }
      console.log(data.payload.event);
    }

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  return (
    <NavigationContainer
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
      linking={linking}>
      {/* <ToDoProvider> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            <Stack.Group>
              <Stack.Screen
                name="LeftDrawer"
                component={LeftDrawer}
                options={{title: 'The Best ToDo List'}}
              />
              {/* <Stack.Screen 
                    name='RightDrawer' 
                    component={RightDrawer} 
                    options={{title: 'The Best ToDo List'}}
                  /> */}
              <Stack.Screen
                name="EditPassword"
                component={EditPassword}
                options={{
                  drawerItemStyle: {display: 'none'},
                }}
              />
              <Stack.Screen
                name="PostToDo"
                component={PostToDo}
                options={{
                  presentation: 'modal',
                  title: 'Add a todo',
                }}
              />
              <Stack.Screen
                name="ToDoDescription"
                component={ToDoDescription}
                options={({route}) => ({
                  presentation: 'modal',
                  title: `${route.params.title} Details`,
                })}
              />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPaassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SignUpComplete" component={SignUpComplete} />
          </>
        )}
      </Stack.Navigator>
      {/* </ToDoProvider> */}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
