import React from "react";
import { View, Text, ImageBackground} from "react-native";
import HoursRegistrationForm  from "./HoursRegistrationForm"
import { hoursRegistrationStyles } from "./HoursRegistrationStyles";


const HoursRegistration = () => {
    return (
    <ImageBackground 
      source = {require("../../../assets/splashScreen.png")}
      style = {hoursRegistrationStyles.backgroundImage}
    >
    <View style={hoursRegistrationStyles.container}>
        <HoursRegistrationForm/> 
    </View>
    </ImageBackground>
    );
}

export default HoursRegistration;