import React, {useState,useEffect} from 'react'
import {View,FlatList,Text} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import TodoItem from '../../components/TodoItem'
import {loadTodos,toggleTodo} from '../../storage/todos'

const PendingScreen = ({navigation}) => {
  const [todos,setTodos] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const data = await loadTodos()
      setTodos(data.filter((todo) => {
        return !todo.completed}))
      setLoading(false)
    };

    const unsubscribe = navigation.addListener("focus", loadData)
    loadData()
    return unsubscribe
  }, [navigation])

  const handleToggle = async (id) => {
    await toggleTodo(id)
    const data = await loadTodos()
    setTodos(data.filter(todo => !todo.completed))
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={["bottom","left","right"]}>
      {loading ? (
        <View style={{flex: 1,justifyContent: "center",alignItems: "center"}}>
          <Text>Loading...</Text>
        </View>
      ) : !todos.length ? (
        <View style={{flex: 1,justifyContent: "center",alignItems: "center"}}>
          <Text style={{fontSize: 16}}>No pending todos</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TodoItem
              todo={item}
              onPress={() => navigation.navigate("TodoDetails", {todo: item})}
              onToggle={() => handleToggle(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default PendingScreen