import React from 'react'
import {View,Text,StyleSheet,ScrollView,TouchableOpacity} from 'react-native'
import {deleteTodo} from '../storage/todos'

export default function TodoDetailsScreen({ route, navigation }) {
  const {todo} = route.params
  const [message,setMessage] = React.useState('')
  const [showDeleteConfirm,setShowDeleteConfirm] = React.useState(false)

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      setMessage("Confrim delete?")
      setTimeout(() => {
        setShowDeleteConfirm(false)
        setMessage('')
      }, 3000)
      return
    }

    try {
      await deleteTodo(todo.id)
      navigation.goBack()
    } catch (error) {
      setMessage("Failed to delete")
      setTimeout(() => setMessage(''), 2000)
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("TodoEdit", {todo})}
          >
            <Text>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleDelete}
          >
            <Text>🗑️</Text>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation,todo])

  return (
    <ScrollView style={{flex: 1}}>
      {message ? (
        <Text style={{color: 'blue'}}>{message}</Text>
      ) : null}
      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.statusIcon}>
            {todo.completed ? '✅' : '⭕'}
          </Text>
          <Text style={styles.statusText}>
            {todo.completed ? "Completed" : "Pending"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.content}>{todo.title}</Text>
      </View>

      {todo.note ? (
        <View style={styles.section}>
          <Text style={styles.label}>Note</Text>
          <Text style={styles.content}>{todo.note}</Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.label}>Created</Text>
        <Text style={styles.content}>
          {new Date(todo.createdAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Last Updated</Text>
        <Text style={styles.content}>
          {new Date(todo.updatedAt).toLocaleString()}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    padding: 10
  },
})