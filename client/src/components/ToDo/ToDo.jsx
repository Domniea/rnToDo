import { 
    Button,
        Dimensions,
        StyleSheet, 
        Text, 
        View, 
        useWindowDimensions,
    } from 'react-native'
import React, { useState, useContext } from 'react'
import { useTheme } from '@react-navigation/native'
import { 
    Gesture, 
    GestureDetector, 
    } from 'react-native-gesture-handler' 
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

import { OrientationContext } from '../../context/OrientationProvider' 

import CustomButton from '../CustomButton'
import ToDoDetails from '../../screens/ToDoDetails/ToDoDetails'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { trigger } from 'react-native-haptic-feedback'



const ToDo = (props) => {

    const {colors} = useTheme()

    const{
        orientation,
        windowWidth,
        windowHeight
    } = useContext(OrientationContext)
    
    const [detailsVisible, setDetailsVisible] = useState(false)

    function toggleDetails() {
        setDetailsVisible(prevState => !prevState)
      }

    const {
        title,
        _id,
        notes,
        deleteToDo,
        panRef,
        scrollRef
    } = props

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const itemHeight = useSharedValue(windowWidth < windowHeight ? 60 :  100)
    const marginVertical = useSharedValue(10)
    const opacity = useSharedValue(0)

    const context = useSharedValue({x: 0})


    //Animated Styles
    const rAnimatedSwipe = useAnimatedStyle((event) => {
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
            marginVertical: marginVertical.value,
        }
    })

//Double Tap Gessture Handler
    const DoubleTapGestureHandler = Gesture.Tap()
        .runOnJS(true)
        .maxDuration(250)
        .numberOfTaps(2)
        .onStart(() => {
            // console.log('double tap')
            toggleDetails()
        })
        .onFinalize(() => {
          
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

//Pan Gesture Handler
    const panGestureHandler = Gesture.Pan()
        .minDistance(-20)
        .onStart(() => {
            context.value = {x: 0}
        })
        .onUpdate((event) => {
            translateX.value = event.translationX
            translateY.value = event.translationY
        })
        .onEnd(() => {
            const willDismiss = translateX.value < -windowWidth * .3
            if(willDismiss) {
                translateX.value = withTiming(-windowWidth)
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
        .withRef(panRef)
   
        const composed = Gesture.Simultaneous(
            panGestureHandler, DoubleTapGestureHandler
          );

          const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        }
    
        const fireHaptic = () => {
          console.log('Haptic Working')
            trigger("impactMedium", options)
        }
    



    return (
        <Animated.View style={[styles.container, rAnimatedContainerStyle]}>

            <Animated.View style={[styles.iconDelete, rAnimatedIconStyle]}>
                <Icon name='trash-alt' size={30} color='red'/>
            </Animated.View>

            <GestureDetector
                  failOffsetY={[-20, 20]}
                  activeOffsetX={[-40, 40]}
                  gesture={panGestureHandler}
                  simultaneousHandlers={scrollRef}
                  style={{backgroundColor:'green'}}
                  
            >
                <Animated.View style={[rAnimatedSwipe, {backgroundColor: colors.card}, styles.card]}>
                    
                { 
                    detailsVisible && 
                    
                        <ToDoDetails 
                            title={title} 
                            _id={_id} notes={notes} 
                            toggleModal={toggleDetails}
                            setDetailsVisible={setDetailsVisible}
                        /> 
                }   
                <GestureDetector gesture={DoubleTapGestureHandler}>
                        <Text 
                            style={[{color: colors.text}, styles.text, orientation === 'LANDSCAPE' ? {fontSize: 20}: {fontSize: 25}]} 
                            onPress={() => fireHaptic()}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                </GestureDetector>
                    
                </Animated.View>
            </GestureDetector >
        </Animated.View>
  )
}

export default ToDo


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: '100%',
        height: '100%',
        paddingVertical: '2.5%',
        paddingHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    text: {
        fontSize: 25,
        maxWidth: '90%',  
        width: '100%',
        textAlign: 'center'

    },
    iconDelete: {
        height: '100%',

        width: '30%',
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
        
    }

})