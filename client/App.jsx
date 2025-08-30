import {View, StyleSheet} from 'react-native';

import 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './src/Navigation/Navigation';
import {UserProvider} from './src/context/UserProvider';
import {ToDoProvider} from './src/context/ToDoProvider';
import {ThemeProvider} from './src/context/ThemeProvider';
import {OrientationProvider} from './src/context/OrientationProvider';
import {ListsProvider} from './src/context/ListsProvider';

import {LogBox} from 'react-native';
// Amplify
import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

function App() {
  // console.warn = (...args) => {
  //   if (typeof args[0] === 'string' && args[0].includes('key')) {
  //     console.trace('⚠️ KEY WARNING TRACE', ...args);
  //   }
  // };

  // LogBox.ignoreLogs([
  //   'A props object containing a "key" prop is being spread into JSX',
  // ]);

  return (
    <SafeAreaView style={styles.root}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  test: {
    flex: 1,
  },
});

// export default withAuthenticator(App);
export default App;
