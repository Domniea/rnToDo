import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { signOut } from 'aws-amplify/auth'

import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import ToDo from '../../components/ToDo'

const Home = () => {

  const navigation = useNavigation()

  const {control, handleSubmit} = useForm()

  function onSignInPress(data) {
    console.log(data)
  }





  
  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }


  console.log('')

  return (
    <View style={styles.container}>
 
      <Text style={styles.header}>Home Page</Text>
      <View style={styles.form}>
        <CustomInput 
          name='title'
          placeholder='What do you need to do?'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        />
        
        {/* <CustomInput 
          name='description'
          placeholder='* Notes'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        /> */}
        {/* <CustomInput 
          name='title'
          placeholder='What do you need to do?'
          control={control}
          rules={{
            required: 'Title is required'
          }}
        /> */}
        <CustomButton 
          text='Submit'
          onPress={handleSubmit(onSignInPress)}
        />
      </View>

      <View style={styles.list}>
        <ToDo />
      </View>

      <View style={styles.footer}>
        <CustomButton
          text='Log Out'
          onPress={handleSignOut}

        />
      </View>
    
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    margin: '10%'
  },
  header: {
    fontSize: 40,
    margin: 15
  },
  form: {
    alignItems: 'center',

    width: '100%'
  },
  list:{

  },
  footer: {
    position: 'absolute',
    bottom: 0,
  }

})