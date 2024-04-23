import React, { useState, useEffect } from "react";
import { Modal, Text, View, Pressable, ImageBackground } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import HistoryComponentForm from "./HistoryComponentForm";

export type ComponentVehicleProps = {
  componentId: string;
};

export type ComponentVehicleRoute = {
  ComponentVehicle: ComponentVehicleProps;
};

type Props = {
  route: RouteProp<ComponentVehicleRoute, "ComponentVehicle">;
};

const HistoryComponentScreen = ({ route }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const componentData = route.params;

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/splashScreen.png")}
        style={{ flex: 1 }}
      >
        <Modal
          animationType="none"
          visible={modalVisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            setModalVisible(false);
            navigation.goBack();
          }}
          transparent={true}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={require("../../../assets/splashScreen.png")}
              style={{ flex: 1, marginTop: 50 }}
            >
              <Animatable.View
                animation="slideInUp"
                duration={1000}
                style={{ marginTop: 22, maxHeight: "80%" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Pressable
                    style={{
                      padding: 10,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.goBack();
                    }}
                  >
                    <Text style={{ fontSize: 20, color: "white" }}>X</Text>
                  </Pressable>
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    marginBottom: 20,
                  }}
                >
                  Histórico de alterações
                </Text>
                <ScrollView>
                  <HistoryComponentForm componentData={componentData} />
                </ScrollView>
              </Animatable.View>
            </ImageBackground>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default HistoryComponentScreen;
