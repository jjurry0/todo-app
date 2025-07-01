import { Text, View } from 'react-native';
import React from 'react';

const TodoListScreen = ({route}) => {
  const { todos } = route.params.todoState || { todos: [] };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할 일 목록</Text>
      <Text>{JSON.stringify(todos)}</Text>
    </View>
  );
};

export default TodoListScreen;