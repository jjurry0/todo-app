import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = () => {
  const navigation = useNavigation();
  //복잡한 구조인 경우 필요함.
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40, fontWeight : "bold"}}>메인 화면</Text>
      <Button title="상세보기 화면으로 이동" onPress={() => navigation.navigate("Details")}/>
    </View>
  );
};

const DetailScreen =({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{ fontSize: 40, fontWeight: "bold"}}>상세보기 화면</Text>
      <Button title="홈 화면으로 이동" onPress={() => navigation.navigate("Home")}/>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Details" component={DetailScreen}/>
        </Stack.Navigator>
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
