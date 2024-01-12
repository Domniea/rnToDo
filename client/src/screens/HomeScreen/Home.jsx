import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'aws-amplify/auth'

import CustomButton from '../../components/CustomButton'

const Home = () => {

  const navigation = useNavigation()

  function logOut() {
    console.log('Logged Out')
    navigation.navigate('SignIn')
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <CustomButton 
        text='Log Out'
        onPress={logOut}
      />
      <Pressable onPress={handleSignOut}>
            <Text>Sign Out</Text>
      </Pressable>
    
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})