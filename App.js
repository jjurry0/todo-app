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
        title="상세보기 화면으로 이동" 
        onPress={() => navigation.navigate("Details")}
      />
      <Button 
        title="할 일 작성"
        onPress={() => navigation.navigate("TodoWrite")}
      />
    </View>
  );
};

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

const DetailScreen =({ navigation, route }) => {
  const todo = route.params?.todo;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{ fontSize: 40, fontWeight: "bold"}}>
        상세보기 화면
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold"}}>
        할 일 : {todo}
      </Text>
      <Button title="홈 화면으로 이동" onPress={() => navigation.navigate("Home")}/>
      <Button title="상세보기 화면으로 이동" onPress={() => navigation.navigate("Details")}/>
    </View>
  )
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        {/* <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Pressable onPress={() => alert("클릭됨")}>
                <Text style={{color: "#fff", fontWeight: "bold"}}>Menu</Text>
              </Pressable>
            ),
          }}
          >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              title: "메인 홈",
            }}
          />
          <Stack.Screen name="TodoWrite" component={TodoWriteScreen}/>
          <Stack.Screen name="Details" component={DetailScreen}/>
        </Stack.Navigator> */}
        <Tab.Navigator 
        screenOptions={{
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
            tabBarLabelTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Pressable onPress={() => alert("클릭됨")}>
                <Text style={{color: "#fff", fontWeight: "bold"}}>Menu</Text>
              </Pressable>
            ),
          }}
          >
          <Tab.Screen name="Home" component={HomeScreen} 
            options={{
              title: "메인 홈", tabBarIcon:({focused}) => (
                <MaterialCommunityIcons name="home-variant" size={30} color="black"/>
              ),
            }}
          />
          <Tab.Screen name="TodoWrite" component={TodoWriteScreen} options={{title: "할 일 작성", tabBarIcon:({focused}) => (
                <MaterialCommunityIcons name="square-edit-outline" size={30} color="black"/>
              ),
          }}/>
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
