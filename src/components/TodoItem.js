import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'

const TodoItem = ({todo,onPress,onToggle}) => (
  <View style={styles.container}>
    <TouchableOpacity 
      style={styles.row} 
      onPress={onPress}>
      <TouchableOpacity
        style={[styles.checkbox,todo.completed && styles.checked]}
        onPress={onToggle}>
        {todo.completed && <Text style={styles.tick}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.textbox}>
        <Text style={[styles.title,todo.completed && styles.strike]}>
          {todo.title}
        </Text>
        {todo.note && <Text style={styles.note}>{todo.note}</Text>}
      </View>

      <Text style={styles.arrow}></Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: 'green',
  },
  textbox: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
  note: {
    fontSize: 14,
  }
});

export default TodoItem