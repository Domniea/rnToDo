import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProtectedRoute = ({user}) => {
  return (
    <View>
      <Text>{user ? 'test' : 'failed'}</Text>
    </View>
  )
}

export default ProtectedRoute

const styles = StyleSheet.create({})