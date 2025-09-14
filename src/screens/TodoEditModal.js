import React, {useState} from 'react'
import {View,TextInput,TouchableOpacity,Text,KeyboardAvoidingView,Platform,ScrollView,} from 'react-native'
import {addTodo,updateTodo} from '../storage/todos'

export default function TodoEditModal({route,navigation}) {
  const todo = route.params?.todo
  const [title,setTitle] = useState(todo?.title ?? '')
  const [note,setNote] = useState(todo?.note ?? '')
  const [submitting,setSubmitting] = useState(false)
  const [error,setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!title.trim()) {
      setError("Title required")
      return;
    }

    try {
      setSubmitting(true)
      if (todo) {
        await updateTodo(todo.id, {title: title.trim(), note: note.trim()})
      } else {
        await addTodo(title.trim(), note.trim())
      }
      navigation.goBack()
    } catch(error) {
      setError("Failed to save")
      setSubmitting(false)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding": "height"}
      style={{flex: 1}}
    >
      <ScrollView style={{flex: 1}}>
        {error ? (
          <Text style={{color: 'red'}}>{error}</Text>
        ) : null}
        <View>
          <Text>Title *</Text>
          <TextInput
            style={{borderWidth: 1}}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter todo title"
            maxLength={100}
            autoFocus
          />
        </View>

        <View>
          <Text>Note (optional)</Text>
          <TextInput
            style={{borderWidth: 1,height: 100}}
            value={note}
            onChangeText={setNote}
            placeholder="Enter additional notes"
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
        </View>
      </ScrollView>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          disabled={submitting}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'blue'}}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={{color: 'white'}}>
            {submitting ? 'Saving...': 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

