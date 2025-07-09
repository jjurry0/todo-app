import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const backgroundImage = require("../assets/images/TodoappImage.png")

const HomeScreen = () => {
  return (
    <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <View style={styles.container}>
        {/*<Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>*/}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  }
});

export default HomeScreen