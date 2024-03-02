import { 
    Button,
        Dimensions,
        StyleSheet, 
        Text, 
        View, 
        useWindowDimensions,
    } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler' 
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

import CustomButton from '../CustomButton'
import ToDoDetails from '../../screens/ToDoDetails/ToDoDetails'
import Icon from 'react-native-vector-icons/FontAwesome5'



const {width: SCREEN_WIDTH} = Dimensions.get('window')
const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * .3
const TODO_HEIGHT = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT * .15 :  SCREEN_HEIGHT * .05



const ToDo = (props) => {

    const {colors} = useTheme()
    
    const [detailsVisible, setDetailsVisible] = useState(false)

    function toggleDetails() {
        setDetailsVisible(prevState => !prevState)
      }

    const { height , width } = useWindowDimensions()

    const {
        title,
        _id,
        notes,
        deleteToDo
    } = props

    const translateX = useSharedValue(0)
    const itemHeight = useSharedValue(TODO_HEIGHT)
    const marginVertical = useSharedValue(10)
    const opacity = useSharedValue(0)

    const context = useSharedValue({x: 0})


    //Animated Styles
    const rAnimatedSwipe = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}]
        }
    })

    const rAnimatedIconStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            translateX.value < -50 ? 1 : 0
        )
        return {opacity}
    })

    const rAnimatedContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value
        }
    })


//Gesture Handler
    const gestureHandler = Gesture.Pan()
        .minDistance(-20)
        .onStart(() => {
            context.value = {x: 0}
        })
        .onUpdate((event) => {
            translateX.value = event.translationX
        })
        .onEnd(() => {
            const willDismiss = translateX.value < TRANSLATE_X_THRESHOLD
            if(willDismiss) {
                translateX.value = withTiming(-SCREEN_WIDTH)
                itemHeight.value = withTiming(0)
                marginVertical.value = withTiming(0, undefined, (isFinished) => {
                    if(isFinished && deleteToDo){
                        runOnJS(deleteToDo)(_id)
                    }
                })
            } else {
                translateX.value = withSpring(0)
            }
        })

        

    return (
        <Animated.View style={[styles.container, rAnimatedContainerStyle]}>
            <Animated.View style={[styles.iconDelete, rAnimatedIconStyle]}>
                <Icon name='trash-alt' size={30} color='red'/>
            </Animated.View>
        <GestureDetector gesture={gestureHandler}>
            <Animated.View style={[rAnimatedSwipe]}>
                
            { 
                detailsVisible && 
                    <ToDoDetails 
                        title={title} 
                        _id={_id} notes={notes} 
                        toggleModal={toggleDetails}
                        setDetailsVisible={setDetailsVisible}
                    /> 
            }   

                <View style={[{backgroundColor: colors.card}, styles.inline]}>
                    <Text 
                        style={[{color: colors.text}, styles.todo]} 
                        onPress={toggleDetails}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            </Animated.View>
        </GestureDetector >
        </Animated.View>
  )
}

export default ToDo


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        

    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 5,
        // backgroundColor: 'green',
        // shadowColor: {color ? "#F0F0F0": '#FFF'},
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

elevation: 11,
    },
    todo: {
        fontSize: 30,
        padding: '2.5%',
        maxWidth: '90%',  
        width: '100%',
        height: '100%',
        // backgroundColor: 'blue',
    },
    iconDelete: {
        height: '100%',
        // backgroundColor: 'red',
        width: '30%',
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
        
    }

})