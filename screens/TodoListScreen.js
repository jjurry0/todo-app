import { Text, TextInput, View, StyleSheet, Pressable, Alert, Modal, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider"
import { ListItem, Icon, Button } from "@rneui/themed";

const TodoListScreen = ({ route }) => {
  const { todos, removeTodo, modifyTodo } = useContext(TodosContext);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [selectedTodoID, setselectedTodoID] = useState(null);
  const [modifiedContent, setmodifiedContent] = useState("");

  const openModifyModal = (todo, reset) => {
    setselectedTodoID(todo.id);
    setmodifiedContent(todo.content);
    reset();
    setModalVisible(true);
  };

  const handleModifyTodo = () => {
    if(selectedTodoID != null) {
      modifyTodo(selectedTodoID, modifiedContent);
    }

    setselectedTodoID(null);
    setModalVisible(false);
  };

  const closeModal = () => {
    setmodifiedContent(modifiedContent);
    setModalVisible(false);
  }

  const handleRemoveTodo = (id, reset) => {
    Alert.alert("경고", "정말 삭제하시겠습니까?", 
      [
        { text: "삭제", onPress: () => {
            removeTodo(id);
            reset();
          }, 
          style: "destructive", 
        },
        { text: "취소", onPress: () => reset(), style: "cancle", },
      ],
      {
        cancelable: true,
        onDismiss: () => reset(),
      }
    );
  };

  return (
    <View style={styles.todoListContainer}>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <View key={todo.id} 
            style={{ 
              marginVertical: 5,
              marginHorizontal: 10,
              borderWidth: 2, 
              borderRadius: 10, 
              overflow: "hidden",
            }}
          >
            <ListItem.Swipeable
              bottomDivider
              style={styles.listBox}
              leftContent={(reset) => (
                <Pressable
                  style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
                  onPress={() => openModifyModal(todo, reset)}
                >
                  <Icon name="update" color="white" />
                  <Text style={styles.btnText}>수정</Text>
                </Pressable>
              )}
              rightContent={(reset) => (
                <Pressable
                  style={{ ...styles.pressableBtn, backgroundColor: "red" }}
                  onPress={() => handleRemoveTodo(todo.id, reset)}
                >
                  <Icon name="delete" color="white" />
                  <Text style={styles.btnText}>삭제</Text>
                </Pressable>
              )}
            >
              <ListItem.Content>
                <ListItem.Title>번호 : {todo.id}</ListItem.Title>
                <ListItem.Subtitle>작성 날짜 : {todo.regDate}</ListItem.Subtitle>
                <ListItem.Subtitle>할 일: {todo.content}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          </View>
        ))
      ) : (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>할 일이 없습니다.</Text>
      )}
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <Pressable onPress = {closeModal} style = {styles.modalContainer}>
              <Pressable style={styles.modalBox}>
                <View style={styles.modalInner}>
                  <View style={{ flexGrow: 1 }}>
                    <TextInput
                      multiline
                      style={styles.modifyInput} 
                      placeholder="수정할 일을 입력해주세요."
                      value={modifiedContent}
                      onChangeText={setmodifiedContent}
                    />
                  </View>
                  <View style= {styles.modalBtnBox}>
                    <TouchableOpacity onPress={handleModifyTodo}>
                      <Text style={styles.modalBtnText}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closeModal}>
                      <Text style={styles.modalBtnText}>취소</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </Pressable>
        </Modal>
    </View>
  );
};  

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listBox: {},
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalInner: {
    flex: 1,
  },
  modalBox: {
    width: "80%",
    minHeight: 250,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
  },
  modalBtnBox: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default TodoListScreen;