import React from "react";
import { View, Text } from "react-native";
import { establishmentStyles } from "./EstablishmentUpdateStyles";

const EstablishmentUpdateForm = () =>{
    return(
        <View style={{width: "85%", flexDirection: "column"}}>
            <Text style={establishmentStyles.text}>Atualização de Estabelecimento</Text>
        </View>
    );
};

export default EstablishmentUpdateForm;