import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { vehicheComponent } from "./VehicheComponentStyles";
import CustomButton from "../../components/button";
import MainTitle from "../../../components/title/mainTitle";
import FrequencyButton from "../../../components/button/frequencyButton";

const CalendarIcon = require("../../../assets/icons/calendar.png");
const PranchetaIcon = require("../../../assets/icons/prancheta.png");
const QuilometragemIcon = require("../../../assets/icons/quilometragem.png");

type InputProps = {
  placeholder: string;
  icon: any;
  onChangeText?: (text: string) => void;
  value?: string;
  errorMessage?: string;
  errorStyle?: object;
};

const Input = ({
  placeholder,
  icon: Icon,
  errorMessage,
  errorStyle,
}: InputProps) => {
  return (
    <View style={vehicheComponent.view}>
      <Image source={Icon} style={vehicheComponent.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        style={vehicheComponent.textInput}
      />
      {errorMessage && <Text style={errorStyle}>{errorMessage}</Text>}
    </View>
  );
};

const VehicheComponentForm = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(
    null
  );
  const [isRequiredComponentType, setIsRequiredComponentType] = useState(false);
  const [isRequiredDate, setIsRequiredDate] = useState(false);
  const [isRequiredMileage, setIsRequiredMileage] = useState(false);
  const [isRequiredFrequency, setIsRequiredFrequency] = useState(false);
  const [componentType, setComponentType] = useState("");
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectFrequency = (frequency: string | null) => {
    if (frequency !== null) {
      const frequencyNumber = parseInt(frequency);
      setSelectedFrequency(frequencyNumber);
    } else {
      setSelectedFrequency(null);
    }
  };

  const handleCustomButtonPress = async () => {
    setIsRequiredComponentType(componentType.trim() === "");
    if (
      componentType.trim() !== "" &&
      date.trim() !== "" &&
      mileage.trim() !== ""
    ) {
    }
  };

  const handleMessageError = (): string => {
    let responseMessage = "";

    if (isRequiredComponentType) {
      responseMessage = "Campo obrigatório";
    } else if (errorMessage !== "") {
      responseMessage = errorMessage;
    }
    return responseMessage;
  };

  const handleMessageDateError = (): string => {
    let responseMessage = "";

    if (isRequiredDate) {
      responseMessage = "Campo obrigatório";
    } else if (errorMessage !== "") {
      responseMessage = errorMessage;
    }
    return responseMessage;
  };

  const handleMessageMileageError = (): string => {
    let responseMessage = "";

    if (isRequiredMileage) {
      responseMessage = "Campo obrigatório";
    } else if (errorMessage !== "") {
      responseMessage = errorMessage;
    }
    return responseMessage;
  };

  const handleMessageFrequencyError = (): string => {
    let responseMessage = "";

    if (isRequiredFrequency) {
      responseMessage = "Campo obrigatório";
    } else if (errorMessage !== "") {
      responseMessage = errorMessage;
    }
    return responseMessage;
  };

  return (
    <View style={{ width: "100%" }}>
      <View>
        <MainTitle title={"Cadastro do\nEstabelecimento"} />
        <Text style={vehicheComponent.paragraph}>
          Preencha os campos com as informações referentes a última troca do
          componente
        </Text>
      </View>
      <View style={vehicheComponent.containerLoginForm}>
        <Input
          placeholder="Tipo do Componente"
          icon={PranchetaIcon}
          onChangeText={(text) => setComponentType(text)}
          value={componentType}
          errorMessage={handleMessageError()}
          errorStyle={{
            color:
              isRequiredComponentType || errorMessage !== "" ? "red" : "black",
          }}
        />
      </View>
      <View style={vehicheComponent.containerLoginForm}>
        <Input
          placeholder="Data da troca"
          icon={CalendarIcon}
          onChangeText={(text) => setDate(text)}
          value={date}
          errorMessage={handleMessageDateError()}
          errorStyle={{
            color: isRequiredDate || errorMessage !== "" ? "red" : "black",
          }}
        />
      </View>
      <View style={vehicheComponent.containerLoginForm}>
        <Input
          placeholder="Quilometragem até a Troca"
          icon={QuilometragemIcon}
          onChangeText={(text) => setMileage(text)}
          value={mileage}
          errorMessage={handleMessageMileageError()}
          errorStyle={{
            color: isRequiredMileage || errorMessage !== "" ? "red" : "black",
          }}
        />
      </View>
      <View style={vehicheComponent.view}>
        <FrequencyButton
          title="Dias"
          options={["Dias", "Mes(es)", "Ano(s)"]}
          onSelect={handleSelectFrequency}
        />
        <TextInput
          placeholder={"Frequência de Lembretes"}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={[
            vehicheComponent.textInput,
            { maxWidth: 220, marginLeft: 10, marginTop: 0 },
          ]}
          onChangeText={(text) => setFrequency(text)}
          value={frequency}
          // errorMessage={handleMessageMileageError()}
          // errorStyle={{
          //   color: isRequiredMileage || errorMessage !== "" ? "red" : "black",
          // }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
        }}
      ></View>
      <View style={{ marginTop: 30 }}>
        <CustomButton title="Cadastrar" onPress={handleCustomButtonPress} />
      </View>
    </View>
  );
};

export default VehicheComponentForm;
