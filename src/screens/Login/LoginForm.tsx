import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Input } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { loginStyles } from "./LoginStyles";
import CustomButton from "../../components/button";
import UserService from "../../services/UserService";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRequiredUsername, setIsRequiredUsername] = useState(false);
  const [isRequiredPassword, setIsRequiredPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessages();
    }, [])
  );

  const clearErrorMessages = () => {
    setErrorMessage("");
    setIsRequiredUsername(false);
    setIsRequiredPassword(false);
  };

  const handleLoginPress = async () => {
    setIsRequiredUsername(username.trim() === "");
    setIsRequiredPassword(password.trim() === "");

    if (username.trim() !== "" && password.trim() !== "") {
      try {
        await UserService.login({ username, password }, navigation);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Usuário ou senha inválidos");
      }
    }
  };

  const handleMessageError = (): string => {
    let responseMessage = "";

    if (isRequiredUsername) {
      responseMessage = "Campo obrigatório";
    } else if (errorMessage !== "") {
      responseMessage = errorMessage;
    }
    return responseMessage;
  };

  const handleMessageErrorPassword = (): string => {
    let responseMessage = "";

    if (isRequiredPassword) {
      responseMessage = "Campo obrigatório";
    } else if (errorMessage !== "") {
      responseMessage = errorMessage;
    }
    return responseMessage;
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
          errorMessage={handleMessageError()}
          errorStyle={{
            color: isRequiredUsername || errorMessage !== "" ? "red" : "black",
          }}
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
          errorMessage={handleMessageErrorPassword()}
          errorStyle={{
            color: isRequiredPassword || errorMessage !== "" ? "red" : "black",
          }}
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
      <CustomButton title="Acessar" onPress={handleLoginPress} />
      <Text
        style={loginStyles.textButton}
        onPress={() => navigation.navigate("ForgotPasswordScreen" as never)}
      >
        Esqueceu a sua senha?
      </Text>
      <Text
        style={loginStyles.textButton}
        onPress={() => navigation.navigate("DriverRegister" as never)}
      >
        Cadastrar Motorista
      </Text>
      <Text
        style={loginStyles.textButton}
        onPress={() => navigation.navigate("VehicleRegistration" as never)} //Trocar isso aqui para pagina de Cadastrar Estabelecimento
      >
        Cadastrar Estabelecimento
      </Text>
    </View>
  );
};

export default LoginForm;
