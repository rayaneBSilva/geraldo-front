import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import VehicheComponentForm from "./VehicheComponentForm";
import { vehicheComponent } from "./VehicheComponentStyles";
import * as Animatable from "react-native-animatable";
import vehicheComponentService from "../../services/VehicheComponentService";
import { useRoute } from "@react-navigation/native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import toastConfig from "../../components/toastMessage/toastConfig";
import { AppFrame } from "../../components/app-frame";

interface ComponentData {
  id: string;
  componentType: string;
  date: string;
  mileage: number;
  frequency: number;
}

const VehicheComponent = () => {
  const route = useRoute();
  const [componentData, setComponentData] = useState<
    ComponentData | undefined
  >();

  useEffect(() => {
    const fetchComponentData = async (id: string) => {
      try {
        const data = await vehicheComponentService.getComponentById(id);
        setComponentData(data as ComponentData);
      } catch (error) {
        console.error("Error fetching component data:", error);
      }
    };

    if (
      route.params &&
      typeof route.params === "object" &&
      "id" in route.params
    ) {
      const id = route.params.id as string;
      fetchComponentData(id);
    }
  }, [route.params]);

  return (
    <AppFrame>
      <View style={{ marginTop: 20 }}>
        <Toast config={toastConfig} />
      </View>
      <View style={vehicheComponent.container}>
        <Animatable.View animation="fadeInUp" style={{ alignItems: "center" }}>
          {<VehicheComponentForm componentData={componentData} />}
        </Animatable.View>
      </View>
    </AppFrame>
  );
};

export default VehicheComponent;
