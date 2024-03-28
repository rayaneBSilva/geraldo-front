import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Input, Text } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { registerDriverStyles } from "./DriverRegisterStyles";
import {
  validateUsername,
  formatCPF,
  validateCPF,
  validateEmail,
  validateDateOfBirth,
  formatDate,
  formatDateBack,
} from "./DriverRegisterValidation";
import { useNavigation } from "@react-navigation/native";
import RegisterSuccesfully from "../RegistrationSuccessfully";
import userServiceDriverRegister from "../../services/UserServiceDriverRegister";
import CustomButton from "../../components/button";

const RegisterForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isRequiredName, setIsRequiredName] = useState(true);
  const [invalidNameMessage, setInvalidNameMessage] = useState("");
  const [allValidationsPassed, setAllValidationsPassed] = useState(false);

  const [username, setUserName] = useState("");
  const [isRequiredUserName, setIsRequiredUserName] = useState(true);
  const [invalidUserNameMessage, setInvalidUserNameMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isRequiredEmail, setIsRequiredEmail] = useState(true);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isRequiredDateOfBirth, setIsRequiredDateOfBirth] = useState(true);
  const [invalidDateOfBirthMessage, setInvalidDateOfBirthMessage] =
    useState("");

  const handleCpfChange = (cpf: any) => {
    setUserName(formatCPF(cpf)); // Formate imediatamente o CPF
  };
  const handleDateChange = (dateOfBirth: any) => {
    setDateOfBirth(formatDate(dateOfBirth));
  };
  const handleLoginPress = async () => {
    const userNameValidation = validateUsername(name);
    setIsRequiredName(userNameValidation.required);
    setInvalidNameMessage(userNameValidation.message);

    const cpfValidation = validateCPF(username);
    setIsRequiredUserName(cpfValidation.required);
    setInvalidUserNameMessage(cpfValidation.message);

    const emailValidation = validateEmail(email);
    setIsRequiredEmail(emailValidation.required);
    setInvalidEmailMessage(emailValidation.message);

    const dateValidation = validateDateOfBirth(dateOfBirth);
    setIsRequiredDateOfBirth(dateValidation.required);
    setInvalidDateOfBirthMessage(dateValidation.message);

    const birthday = formatDateBack(dateOfBirth);

    userServiceDriverRegister.driverRegister(
      { name, username, email, birthday },
      navigation
    );
  };

  const handleUsernameFocus = () => {
    setIsRequiredName(true);
    setInvalidNameMessage("");
  };

  const handleUserCPFFocus = () => {
    setIsRequiredUserName(true);
    setInvalidUserNameMessage("");
  };

  const handleUserEmailFocus = () => {
    setIsRequiredEmail(true);
    setInvalidEmailMessage("");
  };

  const handleUserdateFocus = () => {
    setIsRequiredDateOfBirth(true);
    setInvalidDateOfBirthMessage("");
  };

  const checkValidations = () => {
    if (
      !isRequiredName &&
      !isRequiredUserName &&
      !isRequiredEmail &&
      !isRequiredDateOfBirth
    ) {
      setAllValidationsPassed(true);
    } else {
      setAllValidationsPassed(false);
    }
  };

  useEffect(() => {
    checkValidations();
  });

  return (
    <View style={{ width: "85%", flexDirection: "column" }}>
      <View>
        <Text style={registerDriverStyles.text}>Cadastro do Motorista</Text>
      </View>

      <View style={registerDriverStyles.containerRegisterForm}>
        <FontAwesome
          name="user"
          size={34}
          color={"white"}
          style={registerDriverStyles.icon}
        />
        <Input
          containerStyle={{ width: "90%", marginLeft: 3.5 }}
          style={{ color: "white" }}
          placeholder={"Nome"}
          onChangeText={(text) => setName(text)}
          value={name}
          errorMessage={isRequiredName ? invalidNameMessage : ""}
          errorStyle={{ color: "red", marginLeft: -1 }}
          onFocus={handleUsernameFocus}
        />
      </View>

      <View style={registerDriverStyles.containerRegisterForm}>
        <FontAwesome
          name="address-card"
          size={24}
          color={"white"}
          style={registerDriverStyles.icon}
        />
        <Input
          containerStyle={{ width: "90%" }}
          style={{ color: "white" }}
          placeholder="CPF"
          onChangeText={(text) => setUserName(text)} // Chame handleCpfChange para formatação imediata
          value={formatCPF(username)} // Exiba o CPF formatado
          errorMessage={isRequiredUserName ? invalidUserNameMessage : ""}
          errorStyle={{ color: "red", marginLeft: -1 }}
          onFocus={handleUserCPFFocus}
        ></Input>
      </View>

      <View style={registerDriverStyles.containerRegisterForm}>
        <FontAwesome
          name="envelope"
          size={27}
          color={"white"}
          style={registerDriverStyles.icon}
        />
        <Input
          containerStyle={{ width: "90%" }}
          style={{ color: "white" }}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          onFocus={handleUserEmailFocus}
          errorMessage={isRequiredEmail ? invalidEmailMessage : ""}
          errorStyle={{ color: "red", marginLeft: -1 }}
        ></Input>
      </View>

      <View style={registerDriverStyles.containerRegisterForm}>
        <FontAwesome
          name="calendar"
          size={27}
          color={"white"}
          style={registerDriverStyles.icon}
        />
        <Input
          containerStyle={{ width: "90%" }}
          style={{ color: "white" }}
          placeholder="Data de nascimento"
          onChangeText={handleDateChange}
          value={dateOfBirth}
          onFocus={handleUserdateFocus}
          errorMessage={isRequiredDateOfBirth ? invalidDateOfBirthMessage : ""}
          errorStyle={{ color: "red", marginLeft: -1 }}
        ></Input>
        <View />
      </View>
      <View>
        <CustomButton
          title="Criar conta"
          onPress={() => {
            handleLoginPress();
            checkValidations();
            if (allValidationsPassed) {
              navigation.navigate("RegisterSuccesfully" as never);
            }
          }}
        ></CustomButton>
        <Text
          style={registerDriverStyles.textButton}
          onPress={() => navigation.navigate("Login" as never)}
        >
          Cancelar
        </Text>
      </View>
    </View>
  );
};

export default RegisterForm;
