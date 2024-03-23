import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, SafeAreaView, TouchableOpacity, View } from "react-native";
import Car from '../../../assets/icons/car.svg';
import Chat from '../../../assets/icons/chat.svg';
import Home from '../../../assets/icons/home.svg';
import Loc from '../../../assets/icons/locb.svg';
import User from '../../../assets/icons/userb.svg';
import React, { PropsWithChildren } from 'react';
import { useNavigation } from "@react-navigation/native";

export const AppFrame = ({
    children
}: PropsWithChildren) => {
    const navigation = useNavigation<any>();

    function navigateToScreen(screen: string) {
        navigation.navigate(screen);
    }

    return (
        <SafeAreaView
        style={{
            flex: 1,
            position: "relative"
        }}
        >
            <LinearGradient
            colors={['rgba(35, 34, 138, 1)', 'rgba(13, 13, 51, 1)']}
            style={{
              flex: 1
            }}
            >
                <ImageBackground
                source={require("../../../assets/create-establishment-background.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  justifyContent: "center"
                }}
                >
                    { children }
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
                bottom: 0
            }}
            >
                <TouchableOpacity
                onPress={() => navigateToScreen("ViewCar")}
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                    <Home
                    width={40}
                    height={40}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigateToScreen("ViewCar")}
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                    <Car
                    width={40}
                    height={40}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigateToScreen("ViewCar")}
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                    <Chat
                    width={40}
                    height={40}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigateToScreen("ViewCar")}
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                    <Loc
                    width={40}
                    height={40}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigateToScreen("ViewCar")}
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                    <User
                    width={40}
                    height={40}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView> 
    )
}