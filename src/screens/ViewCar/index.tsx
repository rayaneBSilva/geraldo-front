import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Camera from '../../../assets/icons/camera.svg';
import Plus from '../../../assets/icons/plus.svg';
import { AppFrame } from "../../components/app-frame";

const ViewCar = () => {

    return (
        <AppFrame>
                <View
                style={{
                    width: "80%",
                    height: "80%",
                    alignSelf: "center",
                    borderRadius: 20,
                    borderWidth: 10,
                    borderColor: "white",
                    position: "relative"
                }}
                >
                    <TouchableOpacity
                    style={{
                        position: "absolute",
                        top: 5,
                        right: 8,
                        zIndex: 1
                    }}
                    >
                        <Camera
                        width={30}
                        height={30}
                        />
                    </TouchableOpacity>
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
                            >2.455,45 km</Text>
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
                </View>
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