import React from "react";
import { View, Text, ImageBackground } from "react-native";
import HoursRegistrationForm from "./HoursRegistrationForm"
import { hoursRegistrationStyles } from "./HoursRegistrationStyles";
import { AppFrame } from "../../components/app-frame";


const HoursRegistration = () => {
  return (
    <AppFrame>
      <View style={hoursRegistrationStyles.container}>
        <HoursRegistrationForm />
      </View>
    </AppFrame>
  );
}

export default HoursRegistration;