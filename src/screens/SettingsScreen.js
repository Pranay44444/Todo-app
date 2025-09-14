import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SettingsScreen({navigation}) {
  const [message,setMessage] = React.useState('')
  const [isError,setIsError] = React.useState(false)

  const clearAllTodos = async () => {
    try {
      await AsyncStorage.removeItem('@todos')
      setIsError(false)
      setMessage("Clear successfully")
      setTimeout(() => setMessage(''), 2000)
    } catch (error) {
      setIsError(true)
      setMessage("Failed to clear")
      setTimeout(() => setMessage(''), 2000)
    }
  };

  return (
    <View style={{flex: 1}}>
      {message ? (
        <Text style={[styles.message, isError && styles.errorMessage]}>
          {message}
        </Text>
      ) : null}
      <View style={{padding: 10}}>
        <Text>Data Management</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={clearAllTodos}
        >
          <Text style={styles.deleteText}>Clear All Todos</Text>
        </TouchableOpacity>
      </View>

      <View style={{padding: 10}}>
        <Text>About</Text>
        <View style={styles.infoRow}>
          <Text>Version</Text>
          <Text>1.0.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Developed by</Text>
          <Text>Pranay</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteText: {
    color: 'red',
    fontWeight: 'bold'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  message: {
    color: 'green'
  },
  errorMessage: {
    color: 'red'
  }
})