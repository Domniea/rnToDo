import React from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import Navigation from './src/Navigation/Navigation';
import { UserProvider } from './src/context/UserProvider';


console.log('Amplify Auth Test')


function App(): React.JSX.Element {

  return (
    // <SafeAreaView  >
      <View style={styles.root}>
        <UserProvider>
          <Navigation />
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

export default App;
