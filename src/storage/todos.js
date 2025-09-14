import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@todos'

export const loadTodos = async ()=>{
  try{
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data): []
  } 
  catch(error){
    console.error("Storage error:",error)
    return []
  }
};

export const saveTodos = async (todos)=>{
  try{
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    return true
  } 
  catch(error){
    console.error("Storage error:",error)
    return false
  }
}

export const addTodo = async (title,note = '')=>{
  const todos = await loadTodos()
  const newTodo = {
    id: Date.now().toString(),
    title,
    note,
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
  if (await saveTodos([...todos, newTodo])) {
    return newTodo;
  }
  return null;
}

export const updateTodo = async (id,updates) => {
  const todos = await loadTodos()
  const index = todos.findIndex(todo => todo.id===id)
  if (index === -1) return false;
  todos[index] = {
    ...todos[index],
    ...updates,
    updatedAt: Date.now()
  }
  return saveTodos(todos)
}

export const deleteTodo = async (id) =>{
  const todos = await loadTodos()
  return saveTodos(todos.filter(todo => todo.id !== id));
}

export const toggleTodo = async (id) => {
  const todos = await loadTodos()
  const todo = todos.find(todo => todo.id===id)
  
  if (todo) {
    return updateTodo(id, {completed: !todo.completed})
  }
  return false
};