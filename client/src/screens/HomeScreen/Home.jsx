import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, 
    Text, 
    View, 
    useWindowDimensions, 
    ScrollView, 
    TouchableWithoutFeedback,
    Keyboard, 
    FlatList, 
    Dimensions,
    Platform
  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'

import { ToDoContext } from '../../context/ToDoProvider'
import { UserContext } from '../../context/UserProvider'
import { OrientationContext } from '../../context/OrientationProvider'


import CustomButton from '../../components/CustomButton'
import ToDo from '../../components/ToDo'
import PostToDo from '../PostToDo'


const Home = (props) => {
  const {
    orientation,
    windowWidth,
    windowHeight
  } = useContext(OrientationContext)

  const navigation = useNavigation()

  const [addToDoVisible, setAddToDoVisible] = useState(false)

  function toggleAddToDo(){
    setAddToDoVisible(prevState => !addToDoVisible)
  }

  const {
    colors
  } = useTheme()

  const {
    user
  } = useContext(UserContext)

  const {
    allToDos,
    getUsersToDo,
    deleteToDo
  } = useContext(ToDoContext)

  // function submitDelete(id) {
  //   deleteToDo(id)
  //   getUsersToDo(username)
  // }

  const{
    username,
  } = user

  
  useEffect(() => {
    getUsersToDo(username)
  }, [allToDos.length]) 


  // const toDo = allToDos.map((item, i) => {
  //   return  <ToDo
  //     key={i}
  //     {...item}
  //     notes={item.description}
  //     deleteToDo={deleteToDo}
  //     navigation={navigation}
  //   />
  // })
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={ orientation === 'PORTRAIT' ? styles.container : styles.containerLANDSCAPE }>

        <CustomButton 
          text='Add ToDo' 
          onPress={toggleAddToDo}
          style={styles.test}
          btnMargin={0}
        />
        <Text style={[{color: colors.text}, styles.header]}>ToDo's</Text>
       {
         addToDoVisible && 
          <PostToDo 
            fromToggle='fromToggle' 
            toggleModal={toggleAddToDo} 
            setAddToDoVisible={setAddToDoVisible}
          />
        }
       

        <View style={orientation === 'PORTRAIT' ? {height: '80%', width: '100%'} : {height: '50%', width: '100%'}}> 
          <FlatList
            nestedScrollEnabled={true}
            data={allToDos}
            keyExtractor={(item, id) => item._id + id}
            renderItem={({item}) => <ToDo
              key={item._id}
              {...item}
              notes={item.description}
              deleteToDo={deleteToDo}
              navigation={navigation}
              />
            }
          />
        </View>
      
      </View >

  </TouchableWithoutFeedback>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: '10%'
  },
  containerLANDSCAPE: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '2%'
  },
  header: {
    fontSize: 40,
    margin: 15
  },
  test: {
    backgroundColor: 'green',
    width: 20
  },
  form: {
    alignItems: 'center',
    width: '100%'
  }




})