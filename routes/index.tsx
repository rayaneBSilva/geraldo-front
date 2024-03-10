import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverRegister from "../screens/DriverRegisterForm";
import RegistrationSuccesfully from "../screens/RegistrationSuccessfully";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={DriverRegister} />
      <Stack.Screen name="RegisterSuccesfully" component={RegistrationSuccesfully} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;