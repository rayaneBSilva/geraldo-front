import React, { useEffect, useState } from "react";
import { View, Image, ImageBackground } from "react-native";
import VehicheComponentForm from "./VehicheComponentForm";
import { vehicheComponent } from "./VehicheComponentStyles";
import * as Animatable from "react-native-animatable";
import vehicheComponentService from "../../services/VehicheComponentService";
import { useRoute } from "@react-navigation/native";

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
    <ImageBackground
      source={require("../../../assets/splashScreen.png")}
      style={vehicheComponent.backgroundImage}
    >
      <View style={vehicheComponent.container}>
        <Animatable.View animation="fadeInUp" style={{ alignItems: "center" }}>
          {<VehicheComponentForm componentData={componentData} />}
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

export default VehicheComponent;
