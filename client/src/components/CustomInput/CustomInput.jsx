import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

const CustomInput = (props) => {
    const {
        name,
        placeholder,
        control,
        rules = {},
        secureTextEntry
    } = props

  return (
        <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
            <>
              <View style={[styles.container, {borderColor: error ? 'red': '#e8e8e8'}]}>
                <TextInput  
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={[styles.input]}
                secureTextEntry={secureTextEntry}
                />
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
    padding: 15
  },
  error: {
    color: 'red',
    alignSelf: 'stretch'
  }
})