import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, ViewProps, ViewStyle, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import MapView, { Marker, Callout } from 'react-native-maps';
import Toast from "react-native-toast-message";
import GasPump from '../../../assets/icons/gas-pump.svg';
import { FindEstablishments } from "../../api/queries/FindEstablishments";
import { AppFrame } from "../../components/app-frame";
import getEstablishmentsOrderedByPrice from "../../services/getEstablishments";
import { useAuth } from "../../context/authContext";
import getEstablishments from "../../services/getEstablishments";
import { Button, Alert } from 'react-native';
import NPSDialog from "./rate_establishment";

export type EstablishmentModalProps = {
    isVisible: boolean;
    onRateTap: () => void;
}

const slideInUp = (height: number) => ({
    from: {
        translateY: height * 0.45
    },
    to: {
        translateY: 0
    }
})
const slideOutDown = (height: number) => ({
    from: {
        translateY: 0
    },
    to: {
        translateY: height * 0.45
    }
})

const EstablishmentModal: React.FC<EstablishmentModalProps> = ({
    isVisible,
    onRateTap
}) => {
    const { height } = Dimensions.get('window');
    const ref = useRef<Animatable.AnimatableComponent<ViewProps, ViewStyle>>(null)
    const firstTimeTransition = useRef(true);

    return (
        <Animatable.View
            ref={ref}
            animation={isVisible ? slideInUp(height) : (!firstTimeTransition.current ? slideOutDown(height) : "")}
            onAnimationBegin={() => {
                firstTimeTransition.current = false
            }}
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
                        <Text style={{ color: "#13164B", fontSize: 18, marginBottom: 8 }}>Gasolina: <Text style={{ color: "black" }}>R$ 9,20</Text></Text>
                        <Text style={{ color: "#13164B", fontSize: 18 }}>Diesel: <Text style={{ color: "black" }}>R$ 9,20</Text></Text>
                    </View>
                    <View>
                        <Text style={{ color: "#13164B", fontSize: 18, marginBottom: 8 }}>Funcionamento:</Text>
                        <Text style={{ color: "black", fontSize: 18 }}>16h-22h</Text>
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
                        <Text style={{ color: "#13164B", fontSize: 18, marginBottom: 8 }}>Distância:</Text>
                        <Text style={{ color: "black", fontSize: 18, alignSelf: "center" }}>9 km</Text>
                    </View>
                    <View
                        style={{
                            //paddingHorizontal: 30,
                            //display: "flex",
                            flexDirection: "column",
                            //justifyContent: "space-between",
                            //alignItems: "center",
                        }}
                    >
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
                            }} onPress={() => { }}>
                                <Text style={{
                                    color: "#13164B",
                                    fontSize: 18,
                                }}>
                                    Iniciar Rota
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient
                            colors={["#FCFF58", "#FEC500"]}
                            end={{ x: 1, y: 0.5 }}
                            style={{
                                borderRadius: 15,
                                justifyContent: "center",
                                width: 130,
                                height: 50,
                                marginTop: 10
                            }}
                        >
                            <TouchableOpacity style={{
                                flex: 1,
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center"
                            }} onPress={() => onRateTap()}>
                                <Text style={{
                                    color: "#13164B",
                                    fontSize: 14,
                                    textAlign: "center"
                                }}>
                                    Avaliar{'\n'}estabelecimento
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                </View>
            </View>
        </Animatable.View>
    )
}

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = '';

export type Loc = {
    lat: number;
    long: number;
}

const MapScreen = () => {
    const [establishments, setEstablishments] = useState<Array<any>>([])
    const [selectedEstablishment, setSelectedEstablishment] = useState(null)
    const [location, setLocation] = useState<Loc | null>(null);
    const [closestEstablishments, setClosestEstablishments] = useState<Array<any>>([])
    const auth = useAuth()


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                Toast.show({
                    type: "error",
                    text1: "Erro na localização",
                    text2: "Não conseguimos encontrar sua localização."
                })
                return;
            }

            const location = await Location.getCurrentPositionAsync({});

            setLocation({
                lat: location.coords.latitude,
                long: location.coords.longitude
            })

            //Como saber o combustivel do veiculo?
            const closestEstablishmentsByPrice = await getEstablishments.closestEstablishments(location.coords.latitude, location.coords.longitude, "", auth.authState?.token as string)

            if (auth.authState?.isDriver && !closestEstablishmentsByPrice.isLeft()) {
                setClosestEstablishments(closestEstablishmentsByPrice.value.data.data)
            }


            FindEstablishments
                .execute({
                    lat: location.coords.latitude,
                    long: location.coords.longitude
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
        })()
    }, [])

    // Função para deixar o tipo de combustiveis unicos e pega os de maior preço. - Não sei se isso vai ficar assim
    const filterFuel = (fuels: any[]) => {

        const maxValues: { [key: string]: any } = {};


        fuels.forEach((fuel: any) => {
            const fuelTypeName = fuel.fuelType.name;

            if (!maxValues[fuelTypeName] || fuel.value > maxValues[fuelTypeName].value) {
                maxValues[fuelTypeName] = fuel;
            }
        });
        return Object.values(maxValues);
    };

    const [showDialog, setShowDialog] = useState(false);


    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleSubmitRating = (score: number) => {
        setShowDialog(false);
        // Here you can handle submitting the score to your backend or do anything you want
        Alert.alert('Obrigado!', `Você avaliou como ${score} de 5.`);
    };

    return (
        <AppFrame>
            <View style={{ zIndex: 11, position: "absolute" ,flex: 1, justifyContent: 'center', alignItems: 'center',alignContent: "center" }}>
      {showDialog && (
        <NPSDialog
          onClose={handleCloseDialog}
          onSubmit={handleSubmitRating}
        />
      )}
    </View>
            {
                location && (
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
                        region={{
                            latitude: location.lat,
                            longitude: location.long,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.lat,
                                longitude: location.long
                            }}
                            image={require("../../../assets/icons/orange-car.png")}
                        />
                        <Marker
                            onPress={(e) => {
                                e.stopPropagation();
                                setSelectedEstablishment(10 as any);
                            }}
                            coordinate={destination}
                            image={require("../../../assets/icons/orange-gas-station.png")}
                        />

                        {
                            closestEstablishments.map((item, key) => {
                                return (

                                    <Marker
                                        key={key}
                                        coordinate={{
                                            latitude: item.address.latitude,
                                            longitude: item.address.longitude
                                        }}
                                        image={require("../../../assets/icons/orange-gas-station.png")}

                                    >
                                        <Callout key={key}>
                                            <View style={{ padding: 10 }}>
                                                {
                                                    item?.fuels.length ?

                                                        filterFuel(item?.fuels).map((fuel: any, key: any) => {
                                                            return (
                                                                <Text key={key}>{fuel.fuelType.name}: R$ {fuel.value}</Text>
                                                            )
                                                        })
                                                        :
                                                        <Text key={key}>Combustivel não cadastrado</Text>

                                                }
                                            </View>
                                        </Callout>
                                    </Marker>

                                )
                            })
                        }
                        {/* {
                            establishments.map(establishment => (
                                <Marker
                                key={establishment.id}
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
                            ))
                        } */}
                        {/* <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="#FEC500"
                        /> */}
                    </MapView>
                )
            }
            <EstablishmentModal
                isVisible={!!selectedEstablishment}
                onRateTap={() => setShowDialog(true)}
            />
        </AppFrame>
    )
}



export default MapScreen;