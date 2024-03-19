import React, { useState } from "react";
import { View, Text } from "react-native-animatable";
import { Input } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { carSharingStyles } from "./CarSharingStyle";
import CustomButton from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { cpf } from 'cpf-cnpj-validator'; 
import Succesfully from "../Succesfully";

const CarSharingForm = () => {
  const [userName, setUserName] = useState("");
  const [isRequiredUsername, setIsRequiredUsername] = useState(false);
  const [isInvalidCPF, setIsInvalidCPF] = useState(false); 
  const navigation = useNavigation();

  const handleLoginPress = async () => {
    setIsRequiredUsername(userName.trim() === "");

    if (userName.trim() !== "") {
      if (cpf.isValid(userName.trim())) { 
        try {
          navigation.navigate("VehicleList" as never);
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsInvalidCPF(true); 
      }
    }
  };

  const handleCancel = () => {
    setUserName("");
    setIsInvalidCPF(false); 
  };

  return (
    <View style={{ width: "85%", flexDirection: "column" }}>
      <View>
        <Text style={carSharingStyles.text}>Compartilhamento de Veículo</Text>
      </View>
      <View style={carSharingStyles.containerCarSharingForm}>
        <FontAwesome
          name="address-card"
          size={24}
          color={"white"}
          style={carSharingStyles.icon}
        />
        <Input
          containerStyle={{ width: "90%" }}
          style={{ color: "white" }}
          placeholder="CPF"
          onChangeText={(text) => setUserName(text)}
          value={userName}
          errorMessage={
            isRequiredUsername
              ? "Campo obrigatório"
              : isInvalidCPF 
              ? "CPF inválido"
              : ""
          }
          errorStyle={{ color: isRequiredUsername || isInvalidCPF ? "red" : "black" }}
        />
      </View>
      <View style={carSharingStyles.button}>
      <CustomButton
          title="Compartilhar"
          onPress={
            () => {
              handleLoginPress();
              navigation.navigate("Succesfully" as never);
            }}
        ></CustomButton>
        
      </View>
      <Text
        style={carSharingStyles.textButton}
        onPress={() => {
          handleCancel();
          navigation.navigate("VehicleList" as never);
        }}
      >
        Cancelar?
      </Text>
    </View>
  );
};

export default CarSharingForm;
