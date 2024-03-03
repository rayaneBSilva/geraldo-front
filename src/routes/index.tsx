import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEstablishment from "../screens/CreateEstablishment";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CreateEstablishment" component={CreateEstablishment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;