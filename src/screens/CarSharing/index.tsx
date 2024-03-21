import React from "react";
import { View, Text, ImageBackground} from "react-native";
import CarSharingForm  from "./CarSharingForm"
import { carSharingStyles } from "./CarSharingStyle";


const CarSharing = () => {
    return (
    <ImageBackground 
      source = {require("../../../assets/splashScreen.png")}
      style = {carSharingStyles.backgroundImage}
    >
    <View style={carSharingStyles.container}>
        <CarSharingForm/> 
    </View>
    </ImageBackground>
    );
}

export default CarSharing;