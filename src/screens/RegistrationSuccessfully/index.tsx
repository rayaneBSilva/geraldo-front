
import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import { Styles } from "./RegistSuccesStyles";
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
      style={Styles.backgroundImage}
    >
      <View style={registerDriverStyles.container}>
        <Image
          source={require("../../../assets/geraldo-login.png")}
          style={Styles.logo}
        />
        <Text style={Styles.text}>
          Cadastro realizado com sucesso!
        </Text>
      </View>
    </ImageBackground>
  );
};

export default RegisterSuccesfully;