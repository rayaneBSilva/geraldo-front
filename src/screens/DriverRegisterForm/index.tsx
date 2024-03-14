import React from "react";
import { View, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registerDriverStyles } from "./DriverRegisterStyles";
import DriverRegisterForm from "./DriverRegisterForm";

const DriverRegister = () => {
    const navigation = useNavigation();
    //   const handleNavRegister = () => {
    //     navigation.navigate("Register");
    //   };
    return (
      <ImageBackground
        source={require("../../../assets/splashScreen.png")}
        style={registerDriverStyles.backgroundImage}
      >
        <View style={registerDriverStyles.container}>
          <DriverRegisterForm />
        </View>
      </ImageBackground>
    );
  };

export default DriverRegister;