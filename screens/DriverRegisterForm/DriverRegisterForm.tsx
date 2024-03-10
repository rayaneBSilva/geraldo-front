import React, { useState } from "react";
import { View } from "react-native";
import { Input, Text } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../../components/button/driverRegister";
import { registerDriverStyles } from "./DriverRegisterStyles";
import { validateUsername, formatCPF, validateCPF } from "./DriverRegisterValidation";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [isRequiredUsername, setIsRequiredUsername] = useState(false);
  const [invalidUsernameMessage, setInvalidUsernameMessage] = useState("");

  const [cpf, setCpf] = useState('');
  const [isRequiredCpf, setIsRequiredCpf] = useState(false);
  const [invalidCpfMessage, setInvalidCpfMessage] = useState('');

  const handleCpfChange = (cpf:any) => {
    setCpf(formatCPF(cpf)); // Formate imediatamente o CPF
  };

  const handleLoginPress = async () => {
    const userNameValidation = validateUsername(username);
    setIsRequiredUsername(userNameValidation.required);
    setInvalidUsernameMessage(userNameValidation.message);

    const cpfValidation = validateCPF(cpf);
    setIsRequiredCpf(cpfValidation.required);
    setInvalidCpfMessage(cpfValidation.message);
  };
  
  const handleUsernameFocus = () => {
    setIsRequiredUsername(false);
    setInvalidUsernameMessage("");
  };

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
          onChangeText={(text) => setUsername(text)}
          value={username}
          errorMessage={isRequiredUsername ? invalidUsernameMessage : ""}
          errorStyle={{ color: "red", marginLeft:-1 }}
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
          onChangeText={handleCpfChange} // Chame handleCpfChange para formatação imediata
          value={cpf} // Exiba o CPF formatado
    errorMessage={isRequiredCpf ? invalidCpfMessage : ''}
    errorStyle={{ color: 'red', marginLeft: -1 }}
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
        ></Input>
        <View />
      </View>
      <View>
        <CustomButton
          title="Criar conta"
          onPress={handleLoginPress}
        ></CustomButton>
      </View>
    </View>
  );
};

export default RegisterForm;
