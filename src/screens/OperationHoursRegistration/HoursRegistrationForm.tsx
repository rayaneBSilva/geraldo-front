import React, { useState } from "react";
import { Input } from "@rneui/themed";
import { View, Text } from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { hoursRegistrationStyles } from "./HoursRegistrationStyles";
import CustomButton from "../../components/button";
import { useNavigation, useRoute } from "@react-navigation/native"; 
import Succesfully from "../Succesfully";
import { useAuth } from "../../context/authContext";
import { formatDate,formatDateBack} from "../DriverRegisterForm/DriverRegisterValidation";

const HoursRegistrationForm = () => {
    const [diaDaSemana, setDiaDaSemana] = useState("");
    const [turnoInicial, setTurnoInicial] = useState("");
    const [turnoFinal, setTurnoFinal] = useState("");
    const [isRequiredDiaDaSemana, setRequiredDiaDaSemana] = useState(false);
    const [isRequiredTurnoInicial, setRequiredTurnoInicial] = useState(false);
    const [isRequiredTurnoFinal, setRequiredTurnoFinal] = useState(false);
    const [isInvalidTurnoInicial, setIsInvalidTurnoInicial] = useState(false);
    const [isInvalidTurnoFinal, setIsInvalidTurnoFinal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();
    const route = useRoute();
    const { authState } = useAuth();

    const handleDateChange = (diaDaSemana: any) => {
      setDiaDaSemana(formatDate(diaDaSemana));
    };

    
    const date = formatDateBack(diaDaSemana);
  
    const validarTurno = (turno:string) => {
        if (!turno) {
            return { valido: false, obrigatorio: true, invalido: false };
        }

        const formatoHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

        if (!formatoHora.test(turno)) {
            return { valido: false, obrigatorio: false, invalido: true };
        }

        return { valido: true, obrigatorio: false, invalido: false };
    };

    const handleHoursRegister = async () => {
      const diaDaSemanaValido = validarCampo(diaDaSemana);
      const turnoInicialValido = validarTurno(turnoInicial);
      const turnoFinalValido = validarTurno(turnoFinal);
  
      // Verificando validade dos campos
      if (diaDaSemanaValido.valido && turnoInicialValido.valido && turnoFinalValido.valido) {
          try {
              //const id = route.params.id;
              // await userServiceCarSharing.carSharing({cpf:userName} , id, authState.token);
              navigation.navigate("Login" as never);
          } catch (error: any) {
              console.log(error);
              if (error.response) {
                  setErrorMessage(error.response.data.message);
              }
          }
      } else {
          setRequiredDiaDaSemana(!diaDaSemanaValido.valido);
          setRequiredTurnoInicial(!turnoInicialValido.valido);
          setRequiredTurnoFinal(!turnoFinalValido.valido);
          setIsInvalidTurnoInicial(turnoInicialValido.invalido);
          setIsInvalidTurnoFinal(turnoFinalValido.invalido);
      }
  };
  

    const validarCampo = (campo:string) => {
        if (!campo) {
            return { valido: false, obrigatorio: true, invalido: false };
        }

        const formatoData = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;

        if (!formatoData.test(campo)) {
            return { valido: false, obrigatorio: false, invalido: true };
        }

        return { valido: true, obrigatorio: false, invalido: false };
    };
  
    return (
        <View style={{ width: "85%", flexDirection: "column" }}>
            <View>
                <Text style={hoursRegistrationStyles.text}>Cadastro de horario de Funcionamento</Text>
            </View>
            <View style={hoursRegistrationStyles.containerHoursRegistrationForm}>
                <FontAwesome
                    size={24}
                    color={"white"}
                    style={hoursRegistrationStyles.icon}
                />
                <Input
                    containerStyle={{ width: "90%" }}
                    style={{ color: "white" }}
                    placeholder="Dia da semana"
                    onChangeText={handleDateChange}
                    value={diaDaSemana}
                    errorMessage={
                      isRequiredDiaDaSemana ? "Campo obrigatório formato ano/mês/dia" : ""
                    }
                    errorStyle={{ color: isRequiredDiaDaSemana ? "red" : "black" }}
                />
            </View>
            <View style={hoursRegistrationStyles.containerHoursRegistrationForm}>
                <FontAwesome
                    size={24}
                    color={"white"}
                    style={hoursRegistrationStyles.icon}
                />
                <Input
                    containerStyle={{ width: "90%" }}
                    style={{ color: "white" }}
                    placeholder="Turno Inicial (hh:mm)"
                    onChangeText={(text) => setTurnoInicial(text)}
                    value={turnoInicial}
                    errorMessage={
                        isRequiredTurnoInicial ? "Campo obrigatório formato hh:mm" : isInvalidTurnoInicial ? "Formato de hora inválido" : ""
                    }
                    errorStyle={{ color: isRequiredTurnoInicial || isInvalidTurnoInicial ? "red" : "black" }}
                />
            </View>
            <View style={hoursRegistrationStyles.containerHoursRegistrationForm}>
                <FontAwesome
                    size={24}
                    color={"white"}
                    style={hoursRegistrationStyles.icon}
                />
                <Input
                    containerStyle={{ width: "90%" }}
                    style={{ color: "white" }}
                    placeholder="Turno Final (hh:mm)"
                    onChangeText={(text) => setTurnoFinal(text)}
                    value={turnoFinal}
                    errorMessage={
                        isRequiredTurnoFinal ? "Campo obrigatório formato hh:mm" : isInvalidTurnoFinal ? "Formato de hora inválido" : ""
                    }
                    errorStyle={{ color: isRequiredTurnoFinal || isInvalidTurnoFinal ? "red" : "black" }}
                />
            </View>
            {errorMessage !== "" && (
                <Text style={{ color: "red" }}>{errorMessage}</Text>
            )}
            <View style={hoursRegistrationStyles.button}>
                <CustomButton
                    title="Cadastrar"
                    onPress={handleHoursRegister}
                />
            </View> 
        </View>
    );
};

export default HoursRegistrationForm;
