import React from "react";
import { View } from "react-native";
import { Input, Text } from "@rneui/themed";
import { FontAwesome6, Fontisto } from '@expo/vector-icons';


import { establishmentStyles } from "./EstablishmentUpdateStyles";
import { FontAwesome } from "@expo/vector-icons";


const EstablishmentUpdateForm = () =>{
    return(
        <View style={{width: "85%", flexDirection: "column"}}>
            <Text style={establishmentStyles.text}>Atualização de Estabelecimento</Text>
            <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome
                name="user"
                size={34}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%", marginLeft: 3.5 }}
                style={{ color: "white" }}
                placeholder={"Nome Fantasia"}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>
 <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome
                name="envelope"
                size={28}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%" }}
                style={{ color: "white" }}
                placeholder={"Email"}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <FontAwesome6
                name="phone-volume"
                size={28}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%" }}
                style={{ color: "white" }}
                placeholder={"Telefone"}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>

 <View style={establishmentStyles.containerUpdateForm}>
            <Fontisto
                name="map-marker-alt"
                size={36}
                color={"white"}
              style={establishmentStyles.icon}
            />
            <Input
                containerStyle={{ width: "90%" }}
                style={{ color: "white" }}
                placeholder={"CEP"}
                errorStyle={{ color: "red", marginLeft: -1 }}
        />
 </View>
        </View>

         
    );
};

export default EstablishmentUpdateForm;