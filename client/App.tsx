import React from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import 'react-native-gesture-handler';

import Navigation from './src/Navigation/Navigation';
import { UserProvider } from './src/context/UserProvider';
import { ToDoProvider } from './src/context/ToDoProvider';
import { ThemeProvider } from './src/context/ThemeProvider';
import { OrientationProvider } from './src/context/OrientationProvider'
import { ListsProvider } from './src/context/ListsProvider';

// App.js

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {

console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('key')) {
    console.trace('⚠️ KEY WARNING TRACE', ...args);
  }
};

  return (
    // <SafeAreaView  >
      <View style={styles.root}>
        <OrientationProvider>
          <ThemeProvider>
            <UserProvider>
              <ListsProvider>
                <ToDoProvider>
                  <Navigation />
                </ToDoProvider>
              </ListsProvider>
            </UserProvider>
          </ThemeProvider>
        </OrientationProvider>
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
