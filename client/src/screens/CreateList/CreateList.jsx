import {
  StyleSheet, 
  Text, 
  View,
  Button
} from 'react-native'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from '@react-navigation/native'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

import { ListsContext } from '../../context/ListsProvider'

// import { trigger} from 'react-native-haptic-feedback'
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler'
import { useMMKVString } from 'react-native-mmkv'

// import { test2 } from '../../Storage'

const CreateList = () => {

  const {
    test,
    lists,
    homeList,
    setHomeList,
    setLists,
    getUsersLists,
  } = useContext(ListsContext)

  // const [testCase, setTestCase] = useMMKVString('test.case', test2)

  // const testFunction = () => {
  //   test2.set('test.case', 'boobs')
  // }

  // const testDelete = () => {
  //     test2.delete('test.case')
  // }


  const { control, handleSubmit } = useForm()

  const { colors } = useTheme()




    // const options = {
    //     enableVibrateFallback: true,
    //     ignoreAndroidSystemSettings: false
    // }

    // const fireHaptic = () => {
    //   console.log('Haptic Working')
    //     trigger("impactMedium", options)
    // }


    //Double Tap Gessture Handler
    const doubleTapGestureHandler = Gesture.Tap()
        .runOnJS(true)
        .maxDuration(250)
        .numberOfTaps(2)
        .onStart(() => {
            console.log('double tap')
            // toggleDetails()
        })
        // .withRef(doubleTap)
   

//Pan Gesture Handler
    const panGestureHandler = Gesture.Pan()
        .minDistance(-20)
        .onStart(() => {
            // context.value = {x: 0}
            console.log('scrolling')
        })
        .onUpdate((event) => {
            // translateX.value = event.translationX
            // translateY.value = event.translationY
        })
        .onEnd(() => {
            // const willDismiss = translateX.value < -windowWidth * .3
            // if(willDismiss) {
            //     translateX.value = withTiming(-windowWidth)
            //     itemHeight.value = withTiming(0)
            //     marginVertical.value = withTiming(0, undefined, (isFinished) => {
            //         if(isFinished && deleteToDo){
            //             runOnJS(deleteToDo)(_id)
            //         }
            //     })
            // } else {
            //     translateX.value = withSpring(0)
            // }
            
        })
        // .withRef(panRef)
   
        // const composed = Gesture.Race(
        //     panGestureHandler,
        //     doubleTapGestureHandler
        //   );


  //POST Todo
  async function createList(data) {
    try {
        setLists(prevState => {
          return [
            ...prevState,
            { list: data.newListTitle, data: []}
          ]
        })


    }
    catch(error) {
    console.log(error)
    }
}






  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: colors.text}]}>Create A List!</Text>
      <CustomInput 
        name='newListTitle'
        placeholder='Name your list'
        control={control}
      />
       <CustomButton 
          text='Submit'
          onPress={handleSubmit(createList)}
        />
    </View>
  )
}

export default CreateList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%'
  },
  text: {
    // color: 'white',
    fontSize: 40
  }
})