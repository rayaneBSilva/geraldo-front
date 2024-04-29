import { RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import GasPump from "../../../assets/icons/gas-pump.svg";
import { AppFrame } from "../../components/app-frame";
import UpdateMileageModal from "../../components/updateMileageModal";
import { useAuth } from "../../context/authContext";
import getEstablishments from "../../services/getEstablishments";
import MapViewDirections from "react-native-maps-directions";
import NpsDialog from "../../components/npsDialog/nps_dialog";

type RootStackParamList = {
  MapScreen: { id: number };
};

type MapScreenRouteProp = RouteProp<RootStackParamList, "MapScreen">;

export type EstablishmentModalProps = {
  isVisible: boolean;
  handleInitiateTrip: () => void;
  onRateTap: () => void;
  name: string;
  fuels: {
    gasoline: number;
    diesel: number;
  };
};

const slideInUp = (height: number) => ({
  from: {
    translateY: height * 0.45,
  },
  to: {
    translateY: 0,
  },
});
const slideOutDown = (height: number) => ({
  from: {
    translateY: 0,
  },
  to: {
    translateY: height * 0.45,
  },
});

const EstablishmentModal: React.FC<EstablishmentModalProps> = ({
  isVisible,
  onRateTap,
  name,
  fuels,
  handleInitiateTrip,
}) => {
  const { height } = Dimensions.get("window");
  const ref =
    useRef<Animatable.AnimatableComponent<ViewProps, ViewStyle>>(null);
  const firstTimeTransition = useRef(true);

  return (
    <Animatable.View
      ref={ref}
      animation={isVisible ? slideInUp(height) : slideOutDown(height)}
      onAnimationBegin={() => {
        firstTimeTransition.current = false;
      }}
      style={{
        display: firstTimeTransition.current && !isVisible ? "none" : "flex",
        width: "100%",
        height: "45%",
        zIndex: 10,
        bottom: 0,
        position: "absolute",
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
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          {name}
        </Text>
        <GasPump
          style={{
            position: "relative",
            top: 5,
          }}
          height={100}
        />
      </View>
      <View
        style={{
          backgroundColor: "#D3D3D3",
          flex: 1,
          zIndex: -1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            paddingHorizontal: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View>
            <Text style={{ color: "#13164B", fontSize: 18, marginBottom: 8 }}>
              Gasolina:{" "}
              <Text style={{ color: "black" }}>R$ {fuels.gasoline} </Text>
            </Text>
            <Text style={{ color: "#13164B", fontSize: 18 }}>
              Diesel: <Text style={{ color: "black" }}>R$ {fuels.diesel} </Text>
            </Text>
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
          {/* <View>
                        <Text style={{ color: "#13164B", fontSize: 18, marginBottom: 8 }}>Distância:</Text>
                        <Text style={{ color: "black", fontSize: 18, alignSelf: "center" }}>9 km</Text>
                    </View> */}
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <LinearGradient
              colors={["#FCFF58", "#FEC500"]}
              end={{ x: 1, y: 0.5 }}
              style={{
                borderRadius: 15,
                justifyContent: "center",
                width: 130,
                height: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleInitiateTrip}
              >
                <Text
                  style={{
                    color: "#13164B",
                    fontSize: 18,
                  }}
                >
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
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => onRateTap()}
              >
                <Text
                  style={{
                    color: "#13164B",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Avaliar{"\n"}estabelecimento
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
};

const GOOGLE_MAPS_APIKEY = "AIzaSyCBNSMSaW344jow4JOFMKsbUO8f4FqO7tk";

export type Loc = {
  lat: number;
  long: number;
};

type Establishment = {
    id: string,
  name: string;
  fuels: {
    gasoline: number;
    diesel: number;
  };
  loc: Loc;
};

type Trip = {
  origin: Loc;
  destination: Loc;
};

const MapScreen = ({ route }: { route: MapScreenRouteProp }) => {
  const { id } = route.params;
  const [isEstablishmentModalVisible, setIsEstablishmentModalVisible] =
    useState(false);
  const [selectedEstablishment, setSelectedEstablishment] =
    useState<Establishment | null>(null);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [location, setLocation] = useState<Loc | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [closestEstablishments, setClosestEstablishments] = useState<
    Array<any>
  >([]);
  const auth = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const closeModal = () => {
    console.log(id);
    setModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Erro na localização",
          text2: "Não conseguimos encontrar sua localização.",
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });

      //Como saber o combustivel do veiculo?
      const closestEstablishmentsByPrice =
        await getEstablishments.closestEstablishments(
          location.coords.latitude,
          location.coords.longitude,
          "",
          auth.authState?.token as string
        );

      if (auth.authState?.isDriver && !closestEstablishmentsByPrice.isLeft()) {
        console.log({
          esta: JSON.stringify(
            closestEstablishmentsByPrice.value.data.data,
            null,
            4
          ),
        });
        setClosestEstablishments(closestEstablishmentsByPrice.value.data.data);
      }
    })();
  }, []);

  // Função para deixar o tipo de combustiveis unicos e pega os de maior preço. - Não sei se isso vai ficar assim
  const filterFuel = (fuels: any[]) => {
    const maxValues: { [key: string]: any } = {};

    fuels.forEach((fuel: any) => {
      const fuelTypeName = fuel.fuelType.name;

      if (
        !maxValues[fuelTypeName] ||
        fuel.value > maxValues[fuelTypeName].value
      ) {
        maxValues[fuelTypeName] = fuel;
      }
    });
    return Object.values(maxValues);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSubmitRating = (score: number) => {
    setShowDialog(false);
    // Here you can handle submitting the score to your backend or do anything you want
    Alert.alert("Obrigado!", `Você avaliou como ${score} de 5.`);
  };

  const handleInitiateTrip = () => {
    if (!location) return;

    if (!selectedEstablishment) return;

    const trip: Trip = {
      origin: {
        lat: location.lat,
        long: location.long,
      },
      destination: {
        lat: selectedEstablishment.loc.lat,
        long: selectedEstablishment.loc.long,
      },
    };

    setCurrentTrip(trip);
    setIsEstablishmentModalVisible(false);
  };

    return (
        <AppFrame>
            <View style={{ zIndex: 11, position: "absolute", flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: "center" }}>
                <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
                    <UpdateMileageModal isVisible={modalVisible} onClose={closeModal} idVeiculo={id} token={auth.authState?.token || ''} />
                    <NpsDialog isVisible={showDialog} onClose={handleCloseDialog} idEstabelecimento={selectedEstablishment?.id || ''} token={auth.authState?.token || ''} />
                </View>
            </View>
            {
                location && (
                    <MapView
                        showsBuildings={false}
                        showsPointsOfInterest={false}
                        onPress={() => setIsEstablishmentModalVisible(false)}
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
                        {
                            closestEstablishments.map((item, key) => {
                                return (
                                    <Marker
                                        key={key}
                                        coordinate={{
                                            latitude: Number(item.address.latitude),
                                            longitude: Number(item.address.longitude)
                                        }}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            setSelectedEstablishment({
                                                id: item.id,
                                                name: item.name,
                                                fuels: {
                                                    diesel: item.fuels.find((fuel: any) => fuel.fuelType.name === "DIESEL")?.value ?? 0,
                                                    gasoline: item.fuels.find((fuel: any) => fuel.fuelType.name === "GASOLINE")?.value ?? 0
                                                },
                                                loc: {
                                                    lat: Number(item.address.latitude),
                                                    long: Number(item.address.longitude)
                                                }
                                            });
                                            setIsEstablishmentModalVisible(true);
                                        }}
                                        image={require("../../../assets/icons/orange-gas-station.png")}

                                    />
                                )
                            })
                        }
                        {
                            currentTrip && (
                                <MapViewDirections
                                    origin={{
                                        latitude: currentTrip.origin.lat,
                                        longitude: currentTrip.origin.long
                                    }}
                                    destination={{
                                        latitude: currentTrip.destination.lat,
                                        longitude: currentTrip.destination.long
                                    }}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeWidth={3}
                                    strokeColor="#FEC500"
                                />
                            )
                        }
                    </MapView>
                )
            }
            {
                selectedEstablishment && (
                    <EstablishmentModal
                        isVisible={isEstablishmentModalVisible}
                        onRateTap={() => setShowDialog(true)}
                        name={selectedEstablishment.name}
                        fuels={selectedEstablishment.fuels}
                        handleInitiateTrip={handleInitiateTrip}
                    />
                )
            }
        </AppFrame>
    )
}



export default MapScreen;
