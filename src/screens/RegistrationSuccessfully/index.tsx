import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import { RegisterSuccesfullyStyles } from "./RegistSuccesStyles";
import { registerDriverStyles } from "../DriverRegisterForm/DriverRegisterStyles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface SplashScreenProps {
  navigation: NavigationProp<ParamListBase>;
}


const RegisterSuccesfully: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login"); 
    }, 2000); // Atraso de 3 segundos
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/splashScreen.png")}
      style={RegisterSuccesfullyStyles.backgroundImage}
    >
      <View style={registerDriverStyles.container}>
        <Image
          source={require("../../../assets/geraldo-login.png")}
          style={RegisterSuccesfullyStyles.logo}
        />
        <Text style={RegisterSuccesfullyStyles.text}>
          Cadastro realizado com sucesso!
        </Text>
      </View>
    </ImageBackground>
  );
};

export default RegisterSuccesfully;
