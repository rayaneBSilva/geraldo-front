import React from "react";
import { View, Image, Text, ImageBackground} from "react-native";
import { RegisterSuccesfullyStyles } from "./RegistSuccesStyles";
import { registerDriverStyles } from "../DriverRegisterForm/DriverRegisterStyles";


const RegisterSuccesfully = () =>{
    return(
        <ImageBackground
        source={require("../../assets/splashScreen.png")}
        style={RegisterSuccesfullyStyles.backgroundImage}>

        <View style={registerDriverStyles.container}>
            <Image
                source={require("../../assets/geraldo-login.png")}
                style={RegisterSuccesfullyStyles.logo}></Image>
                <Text 
                    style={RegisterSuccesfullyStyles.text}
                >Casdastro realizado com sucesso!</Text>
        </View>
        </ImageBackground>
    );
};

export default RegisterSuccesfully;