import {StyleSheet, Platform} from 'react-native';
import {useEffect, useContext, useMemo} from 'react';
import {Hub} from 'aws-amplify/utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Context
import {UserContext} from '../context/UserProvider';
import {OrientationContext} from '../context/OrientationProvider';
import {ThemeContext} from '../context/ThemeProvider';
import {ListsContext} from '../context/ListsProvider';

// Navigator
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

// Screens for Navigator
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
import ListScreen from '../screens/ListScreen';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user, setUser, checkUser} = useContext(UserContext);

  const {theme} = useContext(ThemeContext);

  const {lists, setLists, homeList, toRouteName} = useContext(ListsContext);

  const Tab = createMaterialTopTabNavigator();

  const { windowWidth, windowHeight } =
    useContext(OrientationContext);

  // Deep Linking
  const linking = {
    prefixes: ['todoapp://'],
    config: {
      initialRouteName: 'home',
      screens: {
        Home: 'home',
        PostToDo: 'post',
      },
    },
  };

  function TabView() {
    const navigation = useNavigation();

    const screenNames = useMemo(
      () => lists.map(l => toRouteName(l.list)),
      [lists],
    );

    useEffect(() => {
      if (!homeList) return;
      if (screenNames.includes(homeList)) {
        requestAnimationFrame(() => {
          // wait one frame so Tab.Screen mounts
          navigation.navigate('Lists', {screen: homeList});
        });
      }
    }, [homeList, screenNames, navigation]);

    console.log('LISTS', lists);

    return (
      <Tab.Navigator
        tabBarPosition="bottom"
        backBehavior="history"
        screenOptions={{
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarStyle: {paddingBottom: 20, paddingTop: 10},
        }}
        initialLayout={{width: windowWidth}}>
        <Tab.Screen
          name="CreateList"
          list={'Create List'}
          component={CreateList}
        />
        {lists.map(({list, data, index}) => (
          <Tab.Screen
            key={list}
            name={toRouteName(list)}
            options={{title: list}}>
            {({navigation, route}) => (
              <ListScreen
                navigation={navigation}
                route={route}
                listName={list}
                todoList={data}
                index={index}
              />
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    );
  }

  // Main App Drawer
  function LeftDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={
          Platform.OS === 'android' && theme === 'dark'
            ? {headerTintColor: 'white'}
            : {}
        }>
        <Drawer.Screen name="Lists" component={TabView} />
        <Drawer.Screen name="Preferences" component={Preferences} />
      </Drawer.Navigator>
    );
  }

  // SignIn Listener
  useEffect(() => {
    const unsubscribe = Hub.listen('auth', data => {
      const event = data?.payload?.event;
      if (event === 'signedIn') {
        checkUser();
      }
      console.log(event);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // SignOut Listener
  useEffect(() => {
    const unsubscribe = Hub.listen('auth', data => {
      const event = data?.payload?.event;
      if (event === 'signedOut') {
        setUser(undefined);
      }
      console.log(event);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
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
