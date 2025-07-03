import { Text, View, StyleSheet, Pressable } from "react-native";
import React, {useContext} from "react";
import TodosContext from "../components/TodosProvider"
import { ListItem, Icon, Button } from "@rneui/themed";

const TodoListScreen = ({ route }) => {
  const { todos } = useContext(TodosContext);

  return (
    <View style={styles.todoListContainer}>
      {todos.length > 0 ? (
        todos.map((todo) => (
        <View key={todo.id} style={{marginTop: 5}}>
          <ListItem.Swipeable
             style={styles.listBox}
            bottomDivider
            leftContent={(reset) => (
              <Pressable style={{...styles.pressableBtn, backgroundColor: "blue"}}
                title="수정"
                onPress={() => reset()}
              >
                <Icon name="update" color="white"/>
                <Text style={styles.btnText}>수정</Text>
              </Pressable>
            )}
            rightContent={(reset) => (
              <Pressable style={{...styles.pressableBtn, backgroundColor: "red"}}
                title="삭제"
                onPress={() => reset()}
              >
                <Icon name="update" color="white"/>
                <Text style={styles.btnText}>삭제</Text>
              </Pressable>
            )}
          >
            <ListItem.Content> 
              <ListItem.Title>번호 : {todo.id}</ListItem.Title>
              <ListItem.Subtitle>{todo.regDate}</ListItem.Subtitle>
              <ListItem.Subtitle>{todo.content}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem.Swipeable>
        </View>
      ))
      ) : (
        <View style ={{ flex:1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>할 일이 없습니다.</Text>
        </View>
      )} 
    </View>
  );
}; 

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  listBox: {
    borderWidth: 2,
  },
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  }
})

export default TodoListScreen;