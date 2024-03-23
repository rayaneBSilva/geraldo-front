import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import { Input } from "@rneui/themed";
import { vehicheComponent } from "./VehicheComponentStyles";
import CustomButton from "../../components/button";
import MainTitle from "../../../components/title/mainTitle";
import FrequencyButton from "../../../components/button/frequencyButton";
import { useNavigation } from "@react-navigation/native";
import vehicheComponentService from "../../services/VehicheComponentService";
import Validation from "../../validation";
import DateTimePicker from "@react-native-community/datetimepicker";

const CalendarIcon = require("../../../assets/icons/calendar.png");
const PranchetaIcon = require("../../../assets/icons/prancheta.png");
const QuilometragemIcon = require("../../../assets/icons/quilometragem.png");

type InputProps = {
  placeholder: string;
  icon: any;
  onChangeText?: (text: string) => void;
  value?: string;
  onPress?: () => void;
  errorMessage?: string;
  errorStyle?: object;
};

const CustomInput = ({
  placeholder,
  icon: Icon,
  onChangeText,
  value,
  onPress,
  errorMessage,
  errorStyle,
}: InputProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={{ height: 80 }}>
        <View style={vehicheComponent.view}>
          <Image source={Icon} style={vehicheComponent.icon} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={vehicheComponent.textInput}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
        {errorMessage && (
          <Text style={[errorStyle, { paddingLeft: 35 }]}>{errorMessage}</Text>
        )}
      </View>
    </Pressable>
  );
};
interface ComponentData {
  id: number;
  vehicleId: number;
  userId: number;
  componentType: string;
  dateLastExchange: Date;
  kilometersLastExchange: number;
  maintenanceFrequency: number;
}

const VehicheComponentForm = ({
  componentData,
}: {
  componentData?: ComponentData;
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(
    null
  );
  const [isRequiredComponentType, setIsRequiredComponentType] = useState(false);
  const [isRequiredDate, setIsRequiredDate] = useState(false);
  const [isRequiredMileage, setIsRequiredMileage] = useState(false);
  const [isRequiredFrequency, setIsRequiredFrequency] = useState(false);
  const [componentType, setComponentType] = useState("");
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageDate, setErrorMessageDate] = useState("");
  const [errorMessageMileage, setErrorMessageMileage] = useState("");
  const navigation = useNavigation();
  const [type, setType] = useState("new");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (componentData) {
      setComponentType(componentData.componentType);
      setDate(componentData.dateLastExchange.toISOString().split("T")[0]);
      setMileage(componentData.kilometersLastExchange);
      setFrequency(componentData.maintenanceFrequency);

      setType("edit");
    }
  }, [componentData]);

  useEffect(() => {
    if (showPicker) {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [showPicker]);

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
    setIsRequiredDate(date.trim() === "");
    setIsRequiredMileage(mileage === null || mileage === undefined);
    setIsRequiredFrequency(frequency === null || frequency === undefined);

    const dateErrorMessage = Validation.validateDate(date);
    if (dateErrorMessage !== "") {
      setErrorMessageDate(dateErrorMessage);
      return;
    } else {
      setErrorMessageDate("");
    }

    if (
      type === "edit" &&
      componentData?.kilometersLastExchange &&
      mileage !== null &&
      mileage > componentData?.kilometersLastExchange
    ) {
      const mileageErrorMessage = Validation.validateMileage(
        mileage,
        componentData.kilometersLastExchange
      );
      if (mileageErrorMessage !== "") {
        setErrorMessageMileage(mileageErrorMessage);
        return;
      } else {
        setErrorMessageMileage("");
      }
    }

    if (
      componentType.trim() !== "" &&
      date.trim() !== "" &&
      mileage?.toString().trim() !== "" &&
      frequency?.toString().trim() !== ""
    ) {
      try {
        if (type === "edit" && componentData) {
          await vehicheComponentService.updateComponent(
            componentData.id,
            componentData.vehicleId,
            componentData.userId,
            {
              componentType: componentType,
              dateLastExchange: date,
              kilometersLastExchange: mileage,
              maintenanceFrequency: frequency,
            },
            navigation,
            "Componente editado com sucesso!"
          );
        } else {
          await vehicheComponentService.save(
            { componentType, date, mileage, frequency },
            navigation,
            "Componente salvo com sucesso!"
          );
        }
        setErrorMessage("");
        navigation.navigate("VehicleList" as never); //TROCAR DEPOIS
      } catch (error) {
        setErrorMessage("Dados inválidos");
        setErrorMessageDate("Dados inválidos");
        setErrorMessageMileage("Dados inválidos");
      }
    }
  };

  const handleCustomButtonCancel = async () => {
    setComponentType("");
    setDate("");
    setMileage(null);
    setFrequency(null);
    navigation.navigate("VehicleList" as never);
  };

  const handleDatePress = () => {
    setShowPicker(true);
  };

  return (
    <View style={{ width: "100%", marginTop: -30 }}>
      <View>
        {type === "new" ? (
          <MainTitle title={"Cadastro de\nComponente"} />
        ) : (
          <MainTitle title={`${componentData?.componentType}`} />
        )}
        <Text style={vehicheComponent.paragraph}>
          Preencha os campos com as informações referentes a última troca do
          componente
        </Text>
      </View>
      <View style={{ width: "85%", paddingLeft: 20, paddingRight: 20 }}>
        <View style={vehicheComponent.containerLoginForm}>
          <CustomInput
            placeholder="Tipo do Componente"
            icon={PranchetaIcon}
            onChangeText={(text) => setComponentType(text)}
            value={componentType}
            errorMessage={Validation.generateErrorMessage(
              isRequiredComponentType,
              errorMessage
            )}
            errorStyle={{
              color:
                isRequiredComponentType || errorMessage !== ""
                  ? "red"
                  : "black",
            }}
          />
        </View>
        <View style={vehicheComponent.containerLoginForm}>
          <CustomInput
            placeholder="Data da troca"
            icon={CalendarIcon}
            onChangeText={(text) => setDate(text)}
            value={date}
            onPress={handleDatePress}
            errorMessage={Validation.generateErrorMessage(
              isRequiredDate,
              errorMessageDate
            )}
            errorStyle={{
              color:
                isRequiredDate || errorMessageDate !== "" ? "red" : "black",
            }}
          />
        </View>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date(date)}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                const isLastDayOfMonth =
                  selectedDate.getDate() ===
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() + 1,
                    0
                  ).getDate();

                const day = selectedDate.getDate();
                const month = selectedDate.getMonth() + 1;
                const year = selectedDate.getFullYear();

                const formattedDate = `${String(day).padStart(2, "0")}/${String(
                  month
                ).padStart(2, "0")}/${year}`;

                setDate(formattedDate);
              }
              setShowPicker(false);
            }}
          />
        )}
        <View style={vehicheComponent.containerLoginForm}>
          <CustomInput
            placeholder="Quilometragem até a Troca"
            icon={QuilometragemIcon}
            onChangeText={(text) => {
              if (text.trim() === "") {
                setMileage(null);
              } else {
                const parsedValue = parseFloat(text);
                if (!isNaN(parsedValue)) {
                  setMileage(parsedValue);
                } else {
                  setMileage(null);
                }
              }
            }}
            value={mileage ? mileage.toString() : ""}
            errorMessage={Validation.generateErrorMessage(
              isRequiredMileage,
              errorMessageMileage
            )}
            errorStyle={{
              color:
                isRequiredMileage || errorMessageMileage !== ""
                  ? "red"
                  : "black",
            }}
          />
        </View>
        <View style={[vehicheComponent.view, { paddingLeft: 20 }]}>
          <View style={{ marginBottom: 25 }}>
            <FrequencyButton
              title="Dias"
              options={["Dias", "Mes(es)", "Ano(s)"]}
              onSelect={handleSelectFrequency}
            />
          </View>

          <Input
            placeholder={"Frequência de Lembretes"}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={[
              vehicheComponent.textInput,
              { maxWidth: 230, marginTop: 0 },
            ]}
            onChangeText={(text: string) => {
              if (text.trim() === "") {
                setFrequency(null);
              } else {
                const parsedValue = parseFloat(text);
                if (!isNaN(parsedValue)) {
                  setFrequency(parsedValue);
                } else {
                  setFrequency(null);
                }
              }
            }}
            value={frequency ? frequency.toString() : ""}
            errorMessage={Validation.generateErrorMessage(
              isRequiredFrequency,
              errorMessage
            )}
            errorStyle={{
              color:
                isRequiredFrequency || errorMessage !== "" ? "red" : "black",
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
        }}
      ></View>
      <CustomButton
        title="Cadastrar"
        onPress={handleCustomButtonPress}
        style={{ marginTop: 20 }}
      />
      <Text
        style={vehicheComponent.textButton}
        onPress={handleCustomButtonCancel}
      >
        Cancelar
      </Text>
    </View>
  );
};

export default VehicheComponentForm;
