import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import HistoryComponentScreen from "../screens/HistoryComponentScreen";
import Notificacao from "../screens/NotificacaoTeste";
import EstablishmentUpdate from "../screens/Establishment-update";
import HoursRegistration from "../screens/OperationHoursRegistration";
import MapScreen from "../screens/Map";
import { Chat } from "../screens/Chat";
import * as SecureStore from "expo-secure-store";
import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

function Routes() {
  const [isReady, setIsReady] = React.useState(Platform.OS === "web"); // Don't persist state on web since it's based on URL
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          // Only restore state if there's no deep link
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Notificacao" component={Notificacao} />
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
        <Stack.Screen name="HoursRegistration" component={HoursRegistration} />
        <Stack.Screen name="Succesfully" component={Succesfully} />
        {/* <Stack.Screen name="MapaProvisorio" component={MapaProvisorio} /> */}
        <Stack.Screen
          name="HistoryComponentScreen"
          component={HistoryComponentScreen}
        />
        <Stack.Screen
          name="EstablishmentUpdate"
          component={EstablishmentUpdate}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ChatScreen" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
