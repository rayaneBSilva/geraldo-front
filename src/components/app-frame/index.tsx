import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import Car from "../../../assets/icons/car.svg";
import Chat from "../../../assets/icons/chat.svg";
import Home from "../../../assets/icons/home.svg";
import Loc from "../../../assets/icons/locb.svg";
import User from "../../../assets/icons/userb.svg";
import Calendar from "../../../assets/icons/calendar.svg";
import Gas from "../../../assets/icons/gas-station.svg";
import React, { PropsWithChildren } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/authContext";

interface AppFrameProps extends PropsWithChildren {
  route?: any;
}

export const AppFrame = ({ children, route }: AppFrameProps) => {
  const navigation = useNavigation<any>();
  const { authState } = useAuth();

  function navigateToScreen(screen: string, id?: string) {
    console.log(screen);
    console.log(id);
    id ? navigation.navigate(screen, { id:id }) : navigation.navigate(screen);
  }
  if (authState?.isDriver) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <LinearGradient
          colors={["rgba(35, 34, 138, 1)", "rgba(13, 13, 51, 1)"]}
          style={{
            flex: 1,
          }}
        >
          <ImageBackground
            source={require("../../../assets/create-establishment-background.png")}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            {children}
          </ImageBackground>
        </LinearGradient>
        <View
          style={{
            width: "100%",
            height: 55,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "relative",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => navigateToScreen("ViewCarScreen")}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Car width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToScreen("ChatScreen")}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chat width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToScreen("MapScreen")}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loc width={40} height={40} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <LinearGradient
          colors={["rgba(35, 34, 138, 1)", "rgba(13, 13, 51, 1)"]}
          style={{
            flex: 1,
          }}
        >
          <ImageBackground
            source={require("../../../assets/create-establishment-background.png")}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            {children}
          </ImageBackground>
        </LinearGradient>
        <View
          style={{
            width: "100%",
            height: 55,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "relative",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => navigateToScreen("HoursRegistration")}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Calendar fill="#23228A" width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToScreen("MapScreen")}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loc width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToScreen("FuelCatalog")}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gas width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToScreen("EstablishmentUpdate")}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User width={40} height={40} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};
