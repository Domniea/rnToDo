import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback,
    Keyboard
  } from 'react-native'
import {
  FlatList,
  ScrollView
} from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'

import { ToDoContext } from '../../context/ToDoProvider'
import { UserContext } from '../../context/UserProvider'
import { OrientationContext } from '../../context/OrientationProvider'
import { ListsContext } from '../../context/ListsProvider'


import CustomButton from '../../components/CustomButton'
import ToDo from '../../components/ToDo'
import PostToDo from '../PostToDo'
import TestScreen1 from '../TestScreen1'


const Home = (props) => {

  const panRef = useRef(null)
  const scrollRef= useRef(null)

  const navigation = useNavigation()

  const {
    orientation,
    windowWidth,
    windowHeight
  } = useContext(OrientationContext)

  const {
    user
  } = useContext(UserContext)

  const{
    username,
  } = user

  const {
    test,
    lists,
    setLists
  } = useContext(ListsContext)

  const {
    allToDos,
    getUsersToDo,
    deleteToDo
  } = useContext(ToDoContext)

  const [addToDoVisible, setAddToDoVisible] = useState(false)

  function toggleAddToDo(){
    setAddToDoVisible(prevState => !addToDoVisible)
  }

  const {
    colors
  } = useTheme()







  useEffect(() => {
    getUsersToDo(username)
  }, [allToDos.length]) 

  
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


        <ScrollView  ueRef={scrollRef} simultaneousHandlers={panRef}>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            // disableScrollViewPanResponder
            data={allToDos}
            keyExtractor={(item, id) => item._id + id}
            renderItem={({item}) => <ToDo
              key={item._id}
              {...item}
              notes={item.description}
              deleteToDo={deleteToDo}
              navigation={navigation}
              panRef={panRef}
              scrollRef={scrollRef}
              
              />
            }


          />
          </ScrollView>
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