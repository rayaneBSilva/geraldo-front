import { color } from "@rneui/base";
import React from "react";
import { View,Text, ImageBackground  } from "react-native";
import { establishmentStyles } from "./EstablishmentUpdateStyles";
import { AppFrame } from "../../components/app-frame";

const EstablishmentUpdate = () =>{
    return(
        <AppFrame>
        <ImageBackground
        source={require("../../../assets/splashScreen -without-border.png")}   
        style={establishmentStyles.backgroundImage} 
        >
        </ImageBackground>
        </AppFrame>
    );
};

export default EstablishmentUpdate;