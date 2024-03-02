import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Text } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { loginStyles } from "./LoginStyles";
import CustomButton from "../../components/button";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    // <View style={{ width: "85%", marginTop: 20 }}>
    <View style={{ width: "85%" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="user"
          size={24}
          color="white"
          style={loginStyles.icon}
        />
        <Input
          containerStyle={{ width: "90%" }}
          style={{ color: "white" }}
          placeholder="Usuário"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="lock"
          size={24}
          color="white"
          style={loginStyles.icon}
        />
        <Input
          containerStyle={{ flex: 1, marginLeft: 10 }}
          style={{ color: "white" }}
          secureTextEntry={!showPassword}
          placeholder="Senha"
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: 10 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesome
            name={showPassword ? "eye" : "eye-slash"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {/* <CustomButton title="Acessar" onPress={handlePress} /> */}
      <CustomButton title="Acessar" />
      <View />
      <Text
        style={loginStyles.textButton}
        //   onPress={() => {
        //       handleNavRegister();
        //     }}
      >
        Esqueceu a sua senha?
      </Text>
      <Text style={loginStyles.textButton}>Cadastrar Motorista</Text>
      <Text style={loginStyles.textButton}>Cadastrar Estabelecimento</Text>
    </View>
  );
};

export default LoginForm;
