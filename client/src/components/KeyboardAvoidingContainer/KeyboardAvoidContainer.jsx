import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    SafeAreaView, 
    KeyboardAvoidingView, 
    Platform,
    Dimensions
} from 'react-native'
import React from 'react'

import { useHeaderHeight } from '@react-navigation/elements';


const KeyboardAvoidingContainer = ({children, headerAvailable=true}) => {

//Landscape or Portrait
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };
    
    const isLandscape = () => {
        const dim = Dimensions.get('screen');
        return dim.width >= dim.height;
    };

    const headerHeight = headerAvailable ? useHeaderHeight() + 10 : 10


  return (
    <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView 
            style={styles.root}
            behavior={
                Platform.OS  === 'ios' ?
                'padding' : 'height'
            }
            keyboardVerticalOffset={headerHeight}
        >
            <ScrollView >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default KeyboardAvoidingContainer

const styles = StyleSheet.create({
    root: {
        flex:1,
        padding: 20,
    }
})