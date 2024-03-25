import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Plus from '../../../assets/icons/plus.svg';
import { AppFrame } from "../../components/app-frame";
import BackCard from './car_component_component';

const FrontCard = () => {
    return (
        <>
        <ImageBackground
        source={require("../../../assets/car.png")}
        resizeMode="cover"
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          flex: 0.5
        }}
        />
        <View
        style={{
            backgroundColor: "#E0E0E0",
            paddingVertical: 10
        }}
        >
            <Text
            style={{
                marginHorizontal: 15,
                fontSize: 30,
                fontWeight: "bold",
                color: "#13164B"
            }}
            >
                Fiat Uno
            </Text>
        </View>
        <View
        style={{
            backgroundColor: "#B1B1B1",
            paddingVertical: 10
        }}
        >
            <Text
            style={{
                marginHorizontal: 15,
                fontWeight: "bold",
                color: "#0D0D33"
            }}
            >
                Informações do Veículo
            </Text>
        </View>
        <View style={{
            flex: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
        }}>
            <View 
            style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#13164B",
                flex: 1
            }}
            >
                <Text
                style={{
                    fontWeight: "bold",
                    color: "white"
                }}
                >Quilômetros Rodados: </Text>
                <Text
                style={{
                    color: "white"
                }}
                >10 km</Text>
            </View>
            <View 
            style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#1F1546",
                flex: 1
            }}
            >
                <Text
                style={{
                    fontWeight: "bold",
                    color: "white"
                }}
                >Consumo Médio: </Text>
                <Text
                style={{
                    color: "white"
                }}
                >10 km/l</Text>
            </View>
            <View 
            style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#13164B",
                flex: 1
            }}
            >
                <Text
                style={{
                    fontWeight: "bold",
                    color: "white"
                }}
                >Próxima Revisão: </Text>
                <Text
                style={{
                    color: "white"
                }}
                >50,000 km</Text>
            </View>
            <View 
            style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#1F1546",
                flex: 1
            }}
            >
                <Text
                style={{
                    fontWeight: "bold",
                    color: "white"
                }}
                >Distância desde a última revisão: </Text>
                <Text
                style={{
                    color: "white"
                }}                        
                >2,345 km</Text>
            </View>
            <View 
            style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#13164B",
                flex: 1
            }}
            >
                <Text
                style={{
                    fontWeight: "bold",
                    color: "white"
                }}
                >Último abastecimento: </Text>
                <Text
                style={{
                    color: "white"
                }}
                >30l, R$ 3,50/l</Text>
            </View>
            <View 
            style={{
                flexDirection: "row",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#1F1546",
                flex: 1,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20
            }}
            >
                <Text
                style={{
                    fontWeight: "bold",
                    color: "white"
                }}
                >Registro de Viagens: </Text>
                <Text
                style={{
                    color: "white"
                }}                        
                >Janeiro - 3 viagens</Text>
            </View>
        </View>
    </>
    )
}

const ViewCar = () => {
    const [isToShowBack, setIsToShowBack] = useState(false)
    const offset = useSharedValue({ x: 0 });

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          { rotateY: offset.value.x + "deg" }
        ]
      };
    })

    const gesture = Gesture.Pan()
    .onUpdate((e) => {
        if (e.translationX >= 0 && offset.value.x > 0) {
            const newOffset = offset.value.x - e.translationX
            const result = newOffset <= 0 ? 0 : newOffset
            offset.value = withSpring({
                x: result
            }, { damping: 10, stiffness: 100 })
            if (result < 90 && isToShowBack) runOnJS(setIsToShowBack)(false)
        } else if (e.translationX <= 0 && offset.value.x < 180) {
            const newOffset = offset.value.x + Math.abs(e.translationX)
            const result = newOffset >= 180 ? 180 : newOffset
            offset.value = withSpring({
                x: result
            }, { damping: 10, stiffness: 100 })
            if (result > 90 && !isToShowBack) runOnJS(setIsToShowBack)(true)
        }
    })

    return (
        <AppFrame>
                <GestureDetector gesture={gesture}>
                <Animated.View
                style={[
                    animatedStyles
                ]}
                >
                    <View
                    style={{
                        width: "80%",
                        height: "92%",
                        alignSelf: "center",
                        borderRadius: 20,
                        borderWidth: 10,
                        borderColor: "white",
                        position: "relative",
                    }}
                    >
                        {
                            isToShowBack ? (
                                <BackCard/>
                            ) : (
                                <FrontCard
                                />
                            )
                        }
                    </View>
                </Animated.View>
                </GestureDetector>
            <LinearGradient
            colors={['#FCFF58', '#FEC500']}
            end={{x: 1, y: 0.5}}
            style={{
              width: 55,
              height: 55,
              borderRadius: 100,
              position: "absolute",
              bottom: 8,
              right: 15
            }}
            >
                <TouchableOpacity
                style={{
                    flex: 1,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                    <Plus
                    width={25}
                    height={25}
                    />
                </TouchableOpacity>
            </LinearGradient>
        </AppFrame>
    )
}

export default ViewCar;