import React, { useState } from "react";
import { View} from "react-native-animatable";
import { Input, Text } from "@rneui/themed";
import {FontAwesome} from "@expo/vector-icons"
import {carSharingStyles } from "./CarSharingStyle"
import CustomButton from "../../components/button";
import UserService from "../../services/UserService";
import { useNavigation } from "@react-navigation/native";


const CarSharingForm = () => {
    const [userName, setUserName] = useState("");
    const [isRequiredUsername, setIsRequiredUsername] = useState(false);
    const navigation = useNavigation();

    const handleLoginPress = async () => {
        setIsRequiredUsername(userName.trim() === "");
      
    
        if (userName.trim() !== "") {
          try {
            navigation.navigate("VehicleList" as never);

          } catch (error) {
            console.log(error);
          }
        }
      };

      const handleCancel = () => {
        setUserName(""); 
      
      };

   return (
    <View style={{ width: "85%", flexDirection: "column"}}>
        <View>
           <Text style={carSharingStyles.text} >Compartilhamento de Veículo</Text>
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
          errorMessage={isRequiredUsername ? "Campo obrigatório" : ""}
          errorStyle={{ color: isRequiredUsername ? "red" : "black" }}
        ></Input>
      </View>
      <View style={carSharingStyles.button}> 
        <CustomButton title="Compartilhar" onPress={handleLoginPress} />
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
   )
}

export default CarSharingForm;