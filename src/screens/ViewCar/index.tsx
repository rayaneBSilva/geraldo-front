import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Plus from "../../../assets/icons/plus.svg";
import { AppFrame } from "../../components/app-frame";
import BackCard from "./car_component_component";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../context/authContext";
import { GetVehicleData } from "../../api/queries/GetVehicleData";
import Toast from "react-native-toast-message";

type FrontCardProps = {
  model: string;
  plate: string;
  year: string;
  kilometers: number;
}

const FrontCard: React.FC<FrontCardProps> = ({
  kilometers,
  model,
  plate,
  year
}) => {
  return (
    <>
      <ImageBackground
        source={require("../../../assets/car.png")}
        resizeMode="cover"
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          flex: 0.5,
        }}
      />
      <View
        style={{
          backgroundColor: "#E0E0E0",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            marginHorizontal: 15,
            fontSize: 30,
            fontWeight: "bold",
            color: "#13164B",
          }}
        >
          { model }
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#B1B1B1",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            marginHorizontal: 15,
            fontWeight: "bold",
            color: "#0D0D33",
          }}
        >
          Informações do Veículo
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: "#13164B",
            flex: 1,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Quilômetros Rodados:{" "}
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            { kilometers } km
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: "#1F1546",
            flex: 1,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Placa:{" "}
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            { plate }
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: "#13164B",
            flex: 1,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Ano:{" "}
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            { year }
          </Text>
        </View>
      </View>
    </>
  );
};

type RootStackParamList = {
  ViewCarScreen: { id: number };
};

type ViewCarScreenRouteProp = RouteProp<RootStackParamList, "ViewCarScreen">;

const ViewCar = ({ route }: { route: ViewCarScreenRouteProp }) => {
  const [isToShowBack, setIsToShowBack] = useState(false);
  const auth = useAuth();
  const [vehicleData, setVehicleData] = useState({
    model: "",
    year: "",
    plate: "",
    kilometers: 0
  });
  const offset = useSharedValue({ x: 0 });
  const navigation = useNavigation();

  useFocusEffect(() => {
    (async () => {
      const token = auth.authState?.token
      const carId = auth.authState?.carId
      if (token && carId) {
        const response = await GetVehicleData.execute({
          token,
          vehicleId: carId
        })

        if (response.isLeft()) {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Não foi possível recuperar as informações do seu veículo"
          })
        } else {
          setVehicleData(response.value)
        }
      }
    })();
  })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: offset.value.x + "deg" }],
    };
  });

  const gesture = Gesture.Pan().onUpdate((e) => {
    if (e.translationX >= 0 && offset.value.x > 0) {
      const newOffset = offset.value.x - e.translationX;
      const result = newOffset <= 0 ? 0 : newOffset;
      offset.value = withSpring(
        {
          x: result,
        },
        { damping: 10, stiffness: 100 }
      );
      if (result < 90 && isToShowBack) runOnJS(setIsToShowBack)(false);
    } else if (e.translationX <= 0 && offset.value.x < 180) {
      const newOffset = offset.value.x + Math.abs(e.translationX);
      const result = newOffset >= 180 ? 180 : newOffset;
      offset.value = withSpring(
        {
          x: result,
        },
        { damping: 10, stiffness: 100 }
      );
      if (result > 90 && !isToShowBack) runOnJS(setIsToShowBack)(true);
    }
  });

  return (
    <AppFrame>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[animatedStyles]}>
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
            {isToShowBack ? (
              <BackCard idVeiculo={auth.authState?.carId} />
            ) : (
              <FrontCard 
              kilometers={vehicleData.kilometers}
              model={vehicleData.model}
              plate={vehicleData.plate}
              year={vehicleData.year}
              />
            )}
          </View>
        </Animated.View>
      </GestureDetector>
      <LinearGradient
        colors={["#FCFF58", "#FEC500"]}
        end={{ x: 1, y: 0.5 }}
        style={{
          width: 55,
          height: 55,
          borderRadius: 100,
          position: "absolute",
          bottom: 8,
          right: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("VehicheComponent", auth.authState?.carId)
          }
        >
          <Plus width={25} height={25} />
        </TouchableOpacity>
      </LinearGradient>
    </AppFrame>
  );
};

export default ViewCar;
