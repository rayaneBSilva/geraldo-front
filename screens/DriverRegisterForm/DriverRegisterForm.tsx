import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Text } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../../components/button/driverRegister";
import { registerDriverStyles } from "./DriverRegisterStyles";


const RegisterForm = () =>{

    return(
    <View style={{width:"85%", marginTop:100}}>
        
        <View> 
            <Text style={registerDriverStyles.text}>Cadastro do                          Motorista</Text>
        </View>
        
        <View style={registerDriverStyles.containerRegisterForm}>
            <FontAwesome 
                name="user"
                size={24}
                color={"white"}
                style={registerDriverStyles.icon}
             />
            <Input
                containerStyle={{width:"90%"}}
                style= {{color:"white"}}
                placeholder="Nome"
            ></Input>
        </View>

        <View style={registerDriverStyles.containerRegisterForm}>
            <FontAwesome 
                name="address-card"
                size={24}
                color={"white"}
                style={registerDriverStyles.icon}
                >
            </FontAwesome>
            <Input
                containerStyle={{width:"90%"}}
                style= {{color:"white"}}
                placeholder="CPF"
            ></Input>
        </View>

        <View style={registerDriverStyles.containerRegisterForm}>
            <FontAwesome 
                name="envelope"
                size={24}
                color={"white"}
                style={registerDriverStyles.icon}>
            </FontAwesome>
            <Input
                containerStyle={{width:"90%"}}
                style= {{color:"white"}}
                placeholder="Email"
            ></Input>
        </View>

        <View style={registerDriverStyles.containerRegisterForm}>
            <FontAwesome 
                name="calendar"
                size={24}
                color={"white"}
                style={registerDriverStyles.icon}>
            </FontAwesome>
            <Input
                containerStyle={{width:"90%"}}
                style= {{color:"white"}}
                placeholder="Data de nascimento"
            ></Input>
        <View/>

        </View>
        <View>
            <CustomButton
                title="Criar conta"
                onPress={() => {
                    // O que vai acontecer
                    // TO-DO verificações
                }}
            ></CustomButton>

        </View>
    </View>
    );
};

export default RegisterForm;