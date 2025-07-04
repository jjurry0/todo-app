import { StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import tabConfig from './configs/tabConfig';
import { TodosProvider } from "./components/TodosProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      const routeConfig = tabConfig.find((config) => config.name == route.name);

      const iconName = focused ? routeConfig.focusedIcon : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;
      
      return <IconComponent name={iconName} color={color} size={size}/>
    },
    headerTitleAlign: "center",
    headertitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    headerStyle: {
      //Android
      elevation: 10,

      //IOS
      shadowColor: "Black",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      paddingBottom: 10,
      fontWeight: "bold",
    },
    tabBarStyle: {
      height: 60,
    },
    tabBarInactiveTintColor: "#0163d2",
    tabBarActiveTintColor: "black",
  });

  return (
    <TodosProvider>
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
    </TodosProvider>
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