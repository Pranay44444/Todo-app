import React, {useState,useEffect} from 'react';
import {View,FlatList,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoItem from '../../components/TodoItem';
import {loadTodos,toggleTodo} from '../../storage/todos';

const AllScreen = ({navigation}) => {
  const [todos,setTodos] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadTodos();
      setTodos(data.sort((a,b) => b.createdAt - a.createdAt));
      setLoading(false);
    };

    const unsubscribe = navigation.addListener("focus", loadData);
    loadData();
    return unsubscribe;
  }, [navigation]);

  const handleToggle = async (id) => {
    await toggleTodo(id);
    const data = await loadTodos();
    setTodos(data.sort((a, b) => b.createdAt - a.createdAt));
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={["bottom", "left", "right"]}>
      {loading ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text>Loading...</Text>
        </View>
      ) : !todos.length ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontSize: 16}}>No todos yet</Text>
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
      <TouchableOpacity 
        style={styles.add}
        onPress={() => navigation.navigate("TodoEdit")}
      >
        <Text style={styles.addtext}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  add: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addtext: {
    fontSize: 30,
    color: 'white'
  }
});

export default AllScreen