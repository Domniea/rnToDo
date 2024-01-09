import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import CustomButton from '../../components/CustomButton'

const Home = () => {

  const navigation = useNavigation()

  function logOut() {
    console.log('Logged Out')
    navigation.navigate('SignIn')
  }

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <CustomButton 
        text='Log Out'
        onPress={logOut}
      />
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