import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SplashScreen from "../screens/SplashScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreateEstablishment from "../screens/CreateEstablishment";
import DriverRegister from "../screens/DriverRegisterForm";
import RegistrationSuccesfully from "../screens/RegistrationSuccessfully";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        <Stack.Screen name="CreateEstablishment" component={CreateEstablishment} />
        <Stack.Screen name="DriverRegister" component={DriverRegister} /> 
        <Stack.Screen name="RegisterSuccesfully" component={RegistrationSuccesfully} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
