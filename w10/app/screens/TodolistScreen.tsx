// screens/TodoScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../redux/todoSlice";
import { RootState, AppDispatch } from "../redux/store";

const TodoScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos } = useSelector((state: RootState) => state.todo);
  const [text, setText] = useState("");

  const handleAdd = () => {
    dispatch(addTodo({
      id: Date.now().toString(),
      text,
      completed: false,
    }));
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="เพิ่มงาน" value={text} onChangeText={setText} style={styles.input}/>
      <Button title="เพิ่มงาน" onPress={handleAdd} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
              <Text style={{ textDecorationLine: item.completed ? "line-through" : "none" }}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="ลบ" onPress={() => dispatch(removeTodo(item.id))}/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  item: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
});

export default TodoScreen;