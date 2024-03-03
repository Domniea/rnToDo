import React, { useContext } from 'react'
import { StyleSheet, 
        useWindowDimensions, 
        View, 
        TouchableWithoutFeedback, 
        Modal
    } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'


import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer'

import { UserContext } from '../../context/UserProvider'
import { ToDoContext } from '../../context/ToDoProvider'
import { OrientationContext } from '../../context/OrientationProvider'

const PostToDo = (props) => {

    const{
        orientation,
        windowWidth,
        windowHeight
    } = useContext(OrientationContext)

    const navigation = useNavigation()

    const {
        user
    } = useContext(UserContext)

    const {
        submitToDo
    } = useContext(ToDoContext)

    const {
        username
    } = user
    
    const {
        fromToggle,
        toggleModal,
        setAddToDoVisible
    } = props
    
    const {control, handleSubmit} = useForm()
    
    //Dismiss modal
    function disregardModal() {
        setAddToDoVisible(false)
    }

    
    function onSubmitPress(data) {
        submitToDo(username, data)
        {props.route && navigation.goBack() }
        {fromToggle && toggleModal()}
    }

  return (
      <Modal 
      supportedOrientations={[
          'portrait', 
            'landscape',
            'landscape-left', 
            'landscape-right'
            ]} 
            animationType='slide' 
            transparent={true}
            >

       
        <TouchableWithoutFeedback onPress={disregardModal}>
        
            <View style={styles.container}>

                <View style={orientation === 'PORTRAIT' ? styles.form : styles.formLANDSCAPE}>
                    <CustomInput 
                    name='title'
                    placeholder='What do you need to do?'
                    control={control}
                    rules={{
                        required: 'Title is required',
                        validate: (value) => {
                          if (value && value.length >= 30) {
                            // this will give you the correct value for your error message
                            return `Please, enter a title with less than 30 characters (${value.length}/30)`;
                          }
                        }
                      }}
                    keyboardType="default"
                    />
                    <CustomInput 
                    name='description'
                    placeholder='* Notes'
                    control={control}
                    rules={{
                        validate: (value) => {
                          if (value && value.length >= 128) {
                            // this will give you the correct value for your error message
                            return `Please, enter a title with less than 128 characters (${value.length}/30)`;
                          }
                        }
                      }}
                    />
                    <CustomButton 
                    text='Submit'
                    onPress={handleSubmit(onSubmitPress)}
                    />
          
                </View>
                
            </View>
            
        </TouchableWithoutFeedback>


    </Modal>
  )
}

export default PostToDo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        backgroundColor: '#FFF',
        padding: '05%',
        height: '30%',
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 100
    },
    formLANDSCAPE: {
        backgroundColor: '#FFF',
        padding: '5%',
        height: '60%',
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '10%'
    },
})