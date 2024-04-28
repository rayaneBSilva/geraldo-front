import React, { useState, useEffect } from "react";
import { Modal, Text, View, Pressable, ImageBackground } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import HistoryComponentForm from "./HistoryComponentForm";
import { historyComponentStyles } from "./HistoryComponentStyles";

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
            <View style={historyComponentStyles.container}>
              <Animatable.View
                animation="slideInUp"
                duration={1000}
                style={historyComponentStyles.modalContent}
              >
                <View style={historyComponentStyles.closeButtonContainer}>
                  <Pressable
                    style={historyComponentStyles.closeButton}
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        navigation.goBack();
                      }, 200);
                    }}
                  >
                    <Text style={historyComponentStyles.closeButtonText}>
                      X
                    </Text>
                  </Pressable>
                </View>
                <Text style={historyComponentStyles.textHistory}>
                  Histórico de alterações
                </Text>
                <HistoryComponentForm componentData={componentData} />
              </Animatable.View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default HistoryComponentScreen;
