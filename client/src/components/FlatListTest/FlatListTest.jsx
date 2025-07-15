import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect, useContext } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import ToDo from '../ToDo'

import { ToDoContext } from '../../context/ToDoProvider'


const FlatListTest = (props) => {

    const {
        testState,
        // deleteToDo,
        navigation,
        panRef,
        scrollRef,
        testRefresh
    } = props


    const {
      deleteToDo,
      allToDos
    } = useContext(ToDoContext)



useEffect(() => {
  console.log('ran')
  testRefresh()
}, [])






  return (
    <View>

        <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={true}
            data={allToDos}
            keyExtractor={(item) => item._id.toString()}
            ref={scrollRef}
            simultaneousHandlers={panRef}
            // extraData={testState}
            // renderItem={({item}) => <ToDo
            //   key={item._id}
            //   {...item}
            //   notes={item.description}
            //   deleteToDo={deleteToDo}
            //   navigation={navigation}
            //   panRef={panRef}
            //   scrollRef={scrollRef}
              
            //   />
            // }

            renderItem={({ item }) => {

              const { _id, description, ...rest } = item;
              return (
                <ToDo
                  // key={_id}
                  notes={description}
                  deleteToDo={deleteToDo}
                  navigation={navigation}
                  panRef={panRef}
                  scrollRef={scrollRef}
                  {...rest}
                />
              );
            }}


          />
    </View>
  )
}

export default FlatListTest

const styles = StyleSheet.create({})