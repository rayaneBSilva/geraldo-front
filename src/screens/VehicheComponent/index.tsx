import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { AppFrame } from "../../components/app-frame";
import toastConfig from "../../components/toastMessage/toastConfig";
import VehicheComponentForm from "./VehicheComponentForm";
import { vehicheComponent } from "./VehicheComponentStyles";
import ComponentTypeEnum from "../../enum/ComponentTypeEnum";

export type VehicheComponentProps = {
  vehicleId: number;
  componentId?: number;
  componentType?: ComponentTypeEnum;
  dateLastExchange?: Date;
  kilometersLastExchange?: number;
  maintenanceFrequency?: number;
};

export type VehicheComponentRoute = {
  VehicheComponent: VehicheComponentProps;
};

type Props = {
  route: RouteProp<VehicheComponentRoute, "VehicheComponent">;
};

const VehicheComponent = ({ route }: Props) => {
  const componentData = route.params;

  return (
    <AppFrame>
      <View style={{ marginTop: 20 }}>
        <Toast config={toastConfig} />
      </View>
      <View style={vehicheComponent.container}>
        <Animatable.View animation="fadeInUp" style={{ alignItems: "center" }}>
          {<VehicheComponentForm componentData={componentData} />}
          {/* {<VehicheComponentForm componentData={{ vehicleId: 14 }} />} */}
        </Animatable.View>
      </View>
    </AppFrame>
  );
};

export default VehicheComponent;
