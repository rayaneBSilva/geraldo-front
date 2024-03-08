import React, { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Input, Text } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { loginStyles } from "./LoginStyles";
import CustomButton from "../../components/button";
import UserService from "../../services/UserService";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRequiredUsername, setIsRequiredUsername] = useState(false);
  const [isRequiredPassword, setIsRequiredPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLoginPress = async () => {
    username.trim() === ""
      ? setIsRequiredUsername(true)
      : setIsRequiredUsername(false);
    password.trim() === ""
      ? setIsRequiredPassword(true)
      : setIsRequiredPassword(false);

    let data = {
      username: username,
      password: password,
    };

    if (username.trim() !== "" && password.trim() !== "") {
      UserService.login(data)
        .then((response) => {
          setLoading(false);
          navigation.navigate("Teste" as never);
          ///
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert("Usuário não existe" + error);
        });
    }
  };

  return (
    <View style={{ width: "85%" }}>
      <View style={loginStyles.containerLoginForm}>
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
          onChangeText={(text) => setUsername(text)}
          value={username}
          errorMessage={isRequiredUsername ? "Campo obrigatório" : ""}
          errorStyle={{ color: isRequiredUsername ? "red" : "black" }}
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
          containerStyle={{ width: "90%" }}
          style={{ color: "white" }}
          secureTextEntry={!showPassword}
          placeholder="Senha"
          onChangeText={(text) => setPassword(text)}
          value={password}
          errorMessage={isRequiredPassword ? "Campo obrigatório" : ""}
          errorStyle={{ color: isRequiredPassword ? "red" : "black" }}
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
      <CustomButton
        title="Acessar"
        onPress={() => {
          handleLoginPress();
        }}
      />
      <View />
      <Text
        style={loginStyles.textButton}
        onPress={() => {
          navigation.navigate("ForgotPasswordScreen" as never);
        }}
      >
        Esqueceu a sua senha?
      </Text>
      <Text
        style={loginStyles.textButton}
        onPress={() => {
          navigation.navigate("DriverRegister" as never);
        }}
      >
        Cadastrar Motorista
      </Text>
      <Text
        style={loginStyles.textButton}
        onPress={() => {
          navigation.navigate("CreateEstablishment" as never);
        }}
      >
        Cadastrar Estabelecimento
      </Text>
    </View>
  );
};

export default LoginForm;
