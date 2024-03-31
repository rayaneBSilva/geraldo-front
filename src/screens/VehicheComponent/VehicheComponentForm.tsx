import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { VehicheComponentProps, VehicheComponentRoute } from ".";
import FrequencyButton from "../../../components/button/frequencyButton";
import MainTitle from "../../../components/title/mainTitle";
import CustomButton from "../../components/button";
import ComponentTypeEnum from "../../enum/ComponentTypeEnum";
import vehicheComponentService from "../../services/VehicheComponentService";
import Validation from "../../validation";
import { vehicheComponent } from "./VehicheComponentStyles";
import { useAuth } from "../../context/authContext";

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
  const isCalendarIcon = Icon === CalendarIcon;
  return (
    <View style={{ height: 80 }}>
      <View style={vehicheComponent.view}>
        {isCalendarIcon ? (
          <Pressable onPress={onPress}>
            <Image source={CalendarIcon} style={vehicheComponent.icon} />
          </Pressable>
        ) : (
          <Image source={Icon} style={vehicheComponent.icon} />
        )}
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
  );
};

const VehicheComponentForm = ({
  componentData,
}: {
  componentData: VehicheComponentProps;
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(
    null
  );
  const [isRequiredComponentType, setIsRequiredComponentType] = useState(false);
  const [isRequiredDate, setIsRequiredDate] = useState(false);
  const [isRequiredMileage, setIsRequiredMileage] = useState(false);
  const [isRequiredFrequency, setIsRequiredFrequency] = useState(false);
  const [componentType, setComponentType] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [errorMessageTypeComponente, setErrorMessageTypeComponente] =
    useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageDate, setErrorMessageDate] = useState("");
  const [errorMessageMileage, setErrorMessageMileage] = useState("");
  const navigation = useNavigation();
  const [type, setType] = useState("new");
  const [showPicker, setShowPicker] = useState(false);
  const { authState } = useAuth();

  useEffect(() => {
    if (componentData.componentType) {
      setComponentType(componentData.componentType);
      setDate(componentData.dateLastExchange as string);
      setMileage(componentData.kilometersLastExchange as number);
      setFrequency(componentData.maintenanceFrequency as number);

      setType("edit");
    }
  }, [componentData]);

  useEffect(() => {
    if (showPicker) {
      setDate("");
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
    setIsRequiredComponentType(componentType ? false : true);
    setIsRequiredDate(!date);
    setIsRequiredMileage(mileage === null || mileage === undefined);
    setIsRequiredFrequency(frequency === null || frequency === undefined);

    const dateErrorMessage = Validation.validateDate(date);
    if (dateErrorMessage !== "") {
      setErrorMessageDate(dateErrorMessage);
      return;
    } else {
      setErrorMessageDate("");
    }

    const typeComponentErrorMessage = Validation.validateTypeComponent(
      componentType as string
    );
    if (typeComponentErrorMessage !== "") {
      setErrorMessageTypeComponente(typeComponentErrorMessage);
      return;
    } else {
      setErrorMessageTypeComponente("");
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
      componentType?.trim() !== "" &&
      date !== null &&
      mileage?.toString().trim() !== "" &&
      frequency?.toString().trim() !== ""
    ) {
      try {
        if (
          type === "edit" &&
          componentData &&
          componentData.componentId &&
          authState?.token
        ) {
          await vehicheComponentService.updateComponent(
            componentData.componentId,
            authState.token,
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
            {
              componentType,
              dateLastExchange: date,
              kilometersLastExchange: mileage,
              maintenanceFrequency: frequency,
            },
            componentData.vehicleId,
            navigation,
            "Componente cadastrado com sucesso!"
          );
        }
        setErrorMessage("");
        setErrorMessageDate("");
        setErrorMessageMileage("");
        setErrorMessageTypeComponente("");
      } catch (error) {
        console.log(error);
        setErrorMessage("Dados inválidos");
        setErrorMessageDate("Dados inválidos");
        setErrorMessageMileage("Dados inválidos");
        setErrorMessageTypeComponente("Dados inválidos");
      }
    }
  };

  const handleCustomButtonCancel = async () => {
    setComponentType(null);
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
            onChangeText={(text) => setComponentType(text as ComponentTypeEnum)}
            value={componentType ? componentType.toString() : ""}
            errorMessage={Validation.generateErrorMessage(
              isRequiredComponentType,
              errorMessageTypeComponente
            )}
            errorStyle={{
              color:
                isRequiredComponentType || errorMessageTypeComponente !== ""
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
            value={date ? new Date(date) : new Date()}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                selectedDate.setDate(selectedDate.getDate() - 1);
                setShowPicker(false);

                const selectedDateString = selectedDate
                  .toISOString()
                  .split("T")[0];

                setDate(selectedDateString);
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
                const textWithDot = text.replace(",", ".");
                const parsedValue = parseFloat(textWithDot);
                if (!isNaN(parsedValue)) {
                  setMileage(parsedValue);
                } else {
                  setMileage(null);
                }
              }
            }}
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
              onSelect={() => {
                handleSelectFrequency;
              }}
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
        title={type === "new" ? "Cadastrar" : "Atualizar"}
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
