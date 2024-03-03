import React from "react";
import { View, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "./LoginForm";
import { loginStyles } from "./LoginStyles";
import * as Animatable from "react-native-animatable";

const Login = () => {
  const navigation = useNavigation();
  //   const handleNavRegister = () => {
  //     navigation.navigate("Register");
  //   };
  return (
    <ImageBackground
      source={require("../../../assets/splashScreen.png")}
      style={loginStyles.backgroundImage}
    >
      <View style={loginStyles.container}>
        <Animatable.View animation="fadeInUp" style={{ alignItems: "center" }}>
          <Image
            style={loginStyles.logo}
            source={require("../../../assets/geraldo-login.png")}
          />
          {/* <LoginForm handleNavRegister={handleNavRegister} /> */}
          <LoginForm />
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

export default Login;
