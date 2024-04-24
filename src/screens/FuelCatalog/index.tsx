import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { AppFrame } from "../../components/app-frame";
import toastConfig from "../../components/toastMessage/toastConfig";
import FuelCatalogForm from "./FuelCatalogForm";
import { fuelCatalog } from "./FuelCatalogStyles";

export type FuelCatalogProps = {
  fuelId?: number;
  fuelType?: string;
  fuelTitle?: string;
  value?: number;
  productStatus?: boolean;
  establishmentId: number;
};

export type FuelCatalogRoute = {
  FuelCatalog: FuelCatalogProps;
};

type Props = {
  route: RouteProp<FuelCatalogRoute, "FuelCatalog">;
};

const FuelCatalog = ({ route }: Props) => {
  const componentData = route.params;

  return (
    <AppFrame>
      <View style={{ marginTop: 20 }}>
        <Toast config={toastConfig} />
      </View>
      <View style={fuelCatalog.container}>
        <Animatable.View animation="fadeInUp" style={{ alignItems: "center" }}>
          {<FuelCatalogForm componentData={componentData} />}
        </Animatable.View>
      </View>
    </AppFrame>
  );
};

export default FuelCatalog;
