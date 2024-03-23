import React, { useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { splashScreenStyles } from "./SplashScreenStyles";

interface SplashScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <ImageBackground
      source={require("../../../assets/splashScreen.png")}
      style={splashScreenStyles.backgroundImage}
    >
      <View style={splashScreenStyles.container}>
        <View style={splashScreenStyles.containerLogo}>
          <Animatable.Image
            animation="flipInY"
            source={require("../../../assets/geraldo-splash.png")}
            style={{ width: "80%" }}
            resizeMode="contain"
          />
        </View>
        <Text style={splashScreenStyles.loadingText}>Carregando...</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
