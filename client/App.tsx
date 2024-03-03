import 'react-native-gesture-handler';
import React from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import Navigation from './src/Navigation/Navigation';
import { UserProvider } from './src/context/UserProvider';
import { ToDoProvider } from './src/context/ToDoProvider';
import { ThemeProvider } from './src/context/ThemeProvider';
import { OrientationProvider } from './src/context/OrientationProvider'

// App.js

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {

  return (
    // <SafeAreaView  >
      <View style={styles.root}>
        <OrientationProvider>
          <ThemeProvider>
            <UserProvider>
              <ToDoProvider>
                <Navigation />
              </ToDoProvider>
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
