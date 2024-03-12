import {
  StyleSheet, 
  Text, 
  View,
  Button
} from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from '@react-navigation/native'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

import { trigger} from 'react-native-haptic-feedback'
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler'



const CreateList = () => {

  const {control, handleSubmit} = useForm()

  const { colors } = useTheme()




    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false
    }

    const fireHaptic = () => {
      console.log('Haptic Working')
        trigger("impactMedium", options)
    }


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








  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: colors.text}]}>CreateList</Text>
      <CustomInput 
        name='newListTitle'
        placeholder='Name your list'
        control={control}
      />
      <CustomButton 
        text='Submit'
      />
      {/* <ScrollView>
      <GestureDetector gesture={composed}>
      <Button title='Test Haptics' onPress={() => fireHaptic()}/>
      </GestureDetector>
      </ScrollView> */}
    </View>
  )
}

export default CreateList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    // color: 'white',
    fontSize: 40
  }
})