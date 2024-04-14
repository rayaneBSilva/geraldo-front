import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import CreateEstablishment from "../screens/CreateEstablishment";
import ViewCar from "../screens/ViewCar";
import DriverRegister from "../screens/DriverRegisterForm";
import VehicleRegistration from "../screens/VehicleRegistration";
import RegistrationSuccesfully from "../screens/RegistrationSuccessfully";
import VehicheComponent from "../screens/VehicheComponent";
import Login from "../screens/Login";
import SplashScreen from "../screens/SplashScreen";
import VehicleList from "../screens/VehicleListScreen";
import CarSharing from "../screens/CarSharing";
import Succesfully from "../screens/Succesfully";
import FuelCatalog from "../screens/FuelCatalog";
import MapScreen from "../screens/Map";
import { Chat } from "../screens/Chat";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="FuelCatalog" component={FuelCatalog} />
        <Stack.Screen name="ViewCarScreen" component={ViewCar} />
        <Stack.Screen name="VehicleList" component={VehicleList} />
        <Stack.Screen name="VehicheComponent" component={VehicheComponent} />
        <Stack.Screen
          name="CreateEstablishment"
          component={CreateEstablishment}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="DriverRegister" component={DriverRegister} />
        <Stack.Screen
          name="RegisterSuccesfully"
          component={RegistrationSuccesfully}
        />
        <Stack.Screen
          name="VehicleRegistration"
          component={VehicleRegistration}
        />
        <Stack.Screen name="CarSharing" component={CarSharing} />
        <Stack.Screen name="Succesfully" component={Succesfully} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ChatScreen" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
