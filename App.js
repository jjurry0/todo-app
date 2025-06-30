import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  //복잡한 구조인 경우 필요함.
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40, fontWeight : "bold"}}>메인 화면</Text>
      <Button 
        title="할 일 작성"
        onPress={() => navigation.navigate("TodoWrite")}
      />
    </View>
  );
};

const TodoSearchScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>검색 화면</Text>
    </View>
  )
}

const TodoWriteScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");

  return (
    <>
      <TextInput
        multiline
        onChangeText={ setTodo }
        value = { todo }
        placeholder="할 일을 작성해주세요."
        style={{
          flex:0.5, 
          padding: 10, 
          backgroundColor: "#fff", 
          borderRadius: 10, 
          borderWidth: 2,
          margin: 10
        }}
      />
      <Pressable 
        onPress={() => {
          navigation.navigate("Details", { todo });
          setTodo("");
        }}
      >
      <Text style={{
          padding: 10,
          backgroundColor:"#fff",
          borderRadius: 10,
          borderWidth: 2,
          width: "30%",
          textAlign: "center",
          fontWeight: "bold",
          margin: 10,
        }}>
          작성
        </Text>
      </Pressable>
    </>
  )
}

const TodoListScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할 일 목록</Text>
    </View>
  )
}

const MyPageScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>마이페이지</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({route}) => ({
            tabBarLabelStyle: {
              fontSize: 12,
              paddingTop: 10,
              paddingBottom: 10,
              fontWeight: "bold",
            },
            tabBarStyle: {
              height: 100,
            },
            tabBarInactiveTintColor: "#0163d2",
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => {
              let iconName;

              if(route.name == "Home") {
                iconName = "home-variant";
              }
              else if((route.name == "TodoSearch")) {
                iconName = "text-search";
              }
              else if((route.name == "TodoWrite")) {
                iconName = "note-edit";
              }
              else if((route.name == "TodoList")) {
                iconName = "view-list";
              }
              else if((route.name == "MyPage")) {
                iconName = "account-circle";
              }

              return <MaterialCommunityIcons name={iconName} size={30} color={color}/>
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{title: "메인 홈",}}/>
          <Tab.Screen name="TodoSearch" component={TodoSearchScreen} options={{title: "할 일 검색",}}/>
          <Tab.Screen name="TodoWrite" component={TodoWriteScreen} options={{title: "할 일 작성",}}/>
          <Tab.Screen name="TodoList" component={TodoListScreen} options={{title: "할 일 리스트",}}/>
          <Tab.Screen name="MyPage" component={MyPageScreen} options={{title: "마이페이지",}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
