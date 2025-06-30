import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  //복잡한 구조인 경우 필요함.
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40, fontWeight : "bold"}}>메인 화면</Text>
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

  const tabConfig = [
    {
      name: "Home",
      title: "메인 화면",
      component: HomeScreen,
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
      iconComponent: MaterialCommunityIcons
    },
    {
      name: "TodoSearch",
      title: "할 일 검색",
      component: TodoSearchScreen,
      focusedIcon: "search-sharp",
      unfocusedIcon: "search-outline",
      iconComponent: Ionicons,
    },
    {
      name: "TodoWrite",
      title: "할 일 작성",
      component: TodoWriteScreen,
      focusedIcon: "application-edit",
      unfocusedIcon: "application-edit-outline",
      iconComponent: MaterialCommunityIcons
    },
    {
      name: "TodoList",
      title: "할 일 리스트",
      component: TodoListScreen,
      focusedIcon: "list-sharp",
      unfocusedIcon: "list-outline",
      iconComponent: MaterialCommunityIcons
    },
    {
      name: "MyPage",
      title: "마이페이지",
      component: MyPageScreen,
      focusedIcon: "person-circle-sharp",
      unfocusedIcon: "person-circle-outline",
      iconComponent: Ionicons
    },
  ]

  const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      const routeConfig = tabConfig.find((config) => config.name == route.name);

      const iconName = focused ? routeConfig.foucusedIcon : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;
      
      return <IconComponent name={iconName} color={color} size={size}/>
    },
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
  });

  return (
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={screenOptions}
        >
          {tabConfig.map((routeConfig) => (
            <Tab.Screen 
              key = {routeConfig.name} 
              name={routeConfig.name} 
              component={routeConfig.component} 
              options={{title: routeConfig.title}}
            />
          ))}
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
