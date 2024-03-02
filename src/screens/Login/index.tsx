import React from "react";
import { View, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "./LoginForm";
import { loginStyles } from "./LoginStyles";

const Login = () => {
  const navigation = useNavigation();
  //   const handleNavRegister = () => {
  //     navigation.navigate("Register");
  //   };
  return (
    <ImageBackground
      source={require("../../../assets/Tela_de_Carregamento.png")}
      style={loginStyles.backgroundImage}
    >
      <View style={loginStyles.container}>
        <Image
          style={loginStyles.logo}
          source={require("../../../assets/geraldo-login.png")}
        />
        {/* <LoginForm handleNavRegister={handleNavRegister} /> */}
        <LoginForm />
      </View>
    </ImageBackground>
  );
};

export default Login;
