import React, { useContext, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useTheme } from '@react-navigation/native'

import { ThemeContext } from '../../context/ThemeProvider' 
import Icon1 from 'react-native-vector-icons/FontAwesome5'




const CustomInput = (props) => {
    const {
        name,
        placeholder,
        control,
        rules = {},
        secureTextEntry,
        keyboardType,
        errMessage,
        password
    } = props

    const {
      theme
    } = useContext(ThemeContext)

    const { colors } = useTheme()
    const [passwordHidden, setPasswordHidden] = useState(password)

    const togglePasswordVisibility = () => {
      setPasswordHidden(prevState => !prevState)
    }

  return (
    
        <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
            <>
              <View style={[styles.container, {borderColor: error ? 'red': '#e8e8e8', flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}]}>
                <TextInput  
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={[theme === 'dark' ? {color : 'black'} : {color: colors.text}, styles.input]}
                // secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor='#333'
                secureTextEntry={passwordHidden}
                />
                { 
                  password &&
                  <Pressable onPress={() => togglePasswordVisibility()}>
                    {
                    passwordHidden ?
                  <Icon1 style={{textAlign: 'right'}} name='eye' size={30} color='grey'/> :
                  <Icon1 style={{textAlign: 'right'}} name='eye-slash' size={30} color='grey'/>
                    }
                  </Pressable>
                }
              </View>
              {
                 error && (
                 <Text style={styles.error}>{error.message}</Text>
                 )
              }
            </>
          )}
        />  
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        borderColor: '#e8e8e8',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10, 
        marginVertical: 5,
    },
  input: {
    padding: 15,
    width:'80%'
  },
  error: {
    color: 'red',
    alignSelf: 'stretch'
  }
})