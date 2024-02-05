import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

import { Appearance } from 'react-native';
import { useColorScheme } from 'react-native';

import {
  View,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import Navigation from './src/Navigation/Navigation';
import { UserProvider } from './src/context/UserProvider';
import { ToDoProvider } from './src/context/ToDoProvider';

// App.js

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
import { getCurrentUser } from 'aws-amplify/auth';


function App(): React.JSX.Element {

  // const colorScheme1 = Appearance.getColorScheme();
  // const colorScheme2 = useColorScheme();
  // console.log(colorScheme2)


  return (
    // <SafeAreaView  >
      <View style={styles.root}>
        <UserProvider>
          <ToDoProvider>
            <Navigation />
          </ToDoProvider>
        </UserProvider>
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});

// export default withAuthenticator(App);
export default App;
