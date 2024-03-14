import React from "react";
import { View, Image, ImageBackground } from "react-native";
import VehicheComponentForm from "./VehicheComponentForm";
import { vehicheComponent } from "./VehicheComponentStyles";
import * as Animatable from "react-native-animatable";

const VehicheComponent = () => {
  return (
    <ImageBackground
      source={require("../../../assets/splashScreen.png")}
      style={vehicheComponent.backgroundImage}
    >
      <View style={vehicheComponent.container}>
        <Animatable.View animation="fadeInUp" style={{ alignItems: "center" }}>
          <VehicheComponentForm />
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

export default VehicheComponent;
