import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Toast from "react-native-toast-message";
import GasPump from '../../../assets/icons/gas-pump.svg';
import { FindEstablishments } from "../../api/queries/FindEstablishments";
import { AppFrame } from "../../components/app-frame";

const EstablishmentModal = () => {
    return (
                        <View
                style={{
                    width: "100%",
                    height: "45%",
                    zIndex: 10,
                    bottom: 0,
                    position: "absolute"
                }}
                >
                    <View
                    style={{
                        backgroundColor: "#13164B",
                        width: "100%",
                        height: "35%",
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 30
                    }}
                    >
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 25
                        }}>Posto Ipiranga</Text>
                        <GasPump
                        style={{
                            position: "relative",
                            top: 5
                        }}
                        height={100}
                        />
                    </View>
                    <View
                    style={{
                        backgroundColor: "#D3D3D3",
                        flex: 1,
                        zIndex: -1
                    }}
                    >
                        <View
                        style={{
                            paddingHorizontal: 30,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 20
                        }}
                        >
                            <View>
                                <Text style={{color: "#13164B", fontSize: 18, marginBottom: 8}}>Gasolina: <Text style={{color: "black"}}>R$ 9,20</Text></Text>
                                <Text style={{color: "#13164B", fontSize: 18}}>Diesel: <Text style={{color: "black"}}>R$ 9,20</Text></Text>
                            </View>
                            <View>
                                <Text style={{color: "#13164B", fontSize: 18, marginBottom: 8}}>Funcionamento:</Text>
                                <Text style={{color: "black", fontSize: 18}}>16h-22h</Text>
                            </View>
                        </View>
                        <View
                        style={{
                            paddingHorizontal: 30,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        >
                            <View>
                                <Text style={{color: "#13164B", fontSize: 18, marginBottom: 8}}>Distância:</Text>
                                <Text style={{color: "black", fontSize: 18, alignSelf: "center"}}>9 km</Text>
                            </View>
                                <LinearGradient
                                colors={["#FCFF58", "#FEC500"]}
                                end={{ x: 1, y: 0.5 }}
                                style={{
                                borderRadius: 15,
                                justifyContent: "center",
                                width: 130,
                                height: 50
                                }}
                                >
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }} onPress={() => {}}>
                                        <Text style={{
                                        color: "#13164B",
                                        fontSize: 18,
                                        }}>
                                            Iniciar Rota
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                        </View>
                    </View>
                </View>
    )
}

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyD5501e4-4GMS2ipcjo_-GJHpF_av0Cczs';

const MapScreen = () => {
    const [establishments, setEstablishments] = useState<Array<any>>([])
    const [selectedEstablishment, setSelectedEstablishment] = useState(null)

    useFocusEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                FindEstablishments
                .execute({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
                .then(response => {
                    if (response.isLeft()) {
                        Toast.show({
                            type: "error",
                            text1: "Sem estabelecimentos",
                            text2: "Não conseguimos encontrar estabelecimentos próximos."
                        })
                    } else {
                        const result = response.value;
                        setEstablishments(result)
                    }
                })
            }, () => {
                Toast.show({
                    type: "error",
                    text1: "Erro na localização",
                    text2: "Não conseguimos encontrar sua localização."
                })
            });
        } else {
            Toast.show({
                type: "error",
                text1: "Erro na localização",
                text2: "Não conseguimos encontrar sua localização."
            })
        }
    })

    return (
        <AppFrame>
            <MapView
            showsBuildings={false}
            showsPointsOfInterest={false}
            onPress={() => setSelectedEstablishment(null)}
            style={{
                zIndex: 5,
                backgroundColor: "red",
                width: "100%",
                height: "100%"
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            >
                <Marker
                onPress={(e) => {
                    e.stopPropagation();
                    setSelectedEstablishment(10 as any);
                }}
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324
                }}
                image={require("../../../assets/icons/gas-station.png")}
                />
                {/* {
                    establishments.map(establishment => (
                        <Marker
                        key={establishment.id}
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324
                        }}
                        // image={{
                        //     uri:"../../../assets/icons/number.svg"
                        // }}
                        />
                    ))
                } */}
                {/* <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                /> */}
            </MapView>
            {
                selectedEstablishment && <EstablishmentModal/>
            }
        </AppFrame>
    )
}

export default MapScreen;