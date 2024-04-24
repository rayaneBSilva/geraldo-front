import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/themed";
import React, { ReactNode, useEffect, useState } from "react";
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
  children?: ReactNode;
  errorMessage?: string;
  errorStyle?: object;
};

const CustomInput = ({
  placeholder,
  icon: Icon,
  onChangeText,
  value,
  onPress,
  children,
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
        {!children && (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={vehicheComponent.textInput}
            onChangeText={onChangeText}
            value={value}
          />
        )}
        {children && (
          <View style={{ marginTop: 30 }}>
            {children}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    borderBottomColor: "white",
                    borderBottomWidth: 2,
                    width: 265,
                    marginLeft: 2,
                    paddingBottom: 5,
                  }}
                />
              </View>
            </View>
          </View>
        )}
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

  const [isRequiredDate, setIsRequiredDate] = useState(false);
  const [isRequiredMileage, setIsRequiredMileage] = useState(false);
  const [isRequiredFrequency, setIsRequiredFrequency] = useState(false);
  const [componentType, setComponentType] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [dateSave, setDateSave] = useState("");
  const [mileage, setMileage] = useState<number | null>(null);
  const [mileageStr, setMileageStr] = useState<string>("");
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
      setDate(formatDate(componentData.dateLastExchange as string));
      setMileage(componentData.kilometersLastExchange as number);
      setMileageStr(componentData.kilometersLastExchange?.toString() as string);
      setFrequency(componentData.maintenanceFrequency as number);

      setType("edit");
    }
  }, [componentData]);

  useEffect(() => {
    if (showPicker) {
      setDate("");
    }
  }, [showPicker]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const selectedDateString = date.toISOString().split("T")[0];
    const [year, month, day] = selectedDateString.split("-");

    return `${day}-${month}-${year}`;
  };

  const handleSelectFrequency = (frequency: string | null) => {
    if (frequency !== null) {
      const frequencyNumber = parseInt(frequency);
      setSelectedFrequency(frequencyNumber);
    } else {
      setSelectedFrequency(null);
    }
  };

  const handleCustomButtonPress = async () => {
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
              dateLastExchange: dateSave,
              kilometersLastExchange: mileage,
              maintenanceFrequency: frequency,
            },
            navigation,
            "Componente atualizado com sucesso!"
          );
        } else {
          await vehicheComponentService.save(
            componentData.vehicleId,
            {
              componentType,
              dateLastExchange: dateSave,
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
    setMileageStr("");
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
          <MainTitle title={"Atualização de\nComponente"} />
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
            children={
              <FrequencyButton
                title={
                  componentData.componentType
                    ? componentData.componentType +
                      "                                     "
                    : " MOTOR_OIL                                     "
                }
                options={[
                  " MOTOR_OIL                                     ",
                  " BALANCE                                         ",
                  " AIR_FILTER                                      ",
                ]}
                onSelect={(option) => {
                  if (
                    typeof option === "string" &&
                    option.trim() === "AIR_FILTER"
                  ) {
                    setComponentType(ComponentTypeEnum.AIR_FILTER);
                  } else if (
                    typeof option === "string" &&
                    option.trim() === "MOTOR_OIL"
                  ) {
                    setComponentType(ComponentTypeEnum.MOTOR_OIL);
                  } else if (
                    typeof option === "string" &&
                    option.trim() === "BALANCE"
                  ) {
                    setComponentType(ComponentTypeEnum.BALANCE);
                  }
                }}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            }
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
              if (selectedDate && event.type === "set") {
                const modifiedDate = new Date(selectedDate);
                modifiedDate.setDate(modifiedDate.getDate());
                setShowPicker(false);

                const selectedDateString = modifiedDate
                  .toISOString()
                  .split("T")[0];

                const [year, month, day] = selectedDateString.split("-");
                const invertedDate = `${day}-${month}-${year}`;
                setDate(invertedDate);
                setDateSave(selectedDateString);
                setShowPicker(false);
              } else {
                setShowPicker(false);
                setDate(date);
                setDateSave(dateSave);
              }
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
                setMileageStr("");
              } else {
                const textWithDot = text.replace(",", ".");
                const parsedValue = parseFloat(textWithDot);
                if (!isNaN(parsedValue)) {
                  setMileage(parsedValue);
                  setMileageStr(text);
                } else {
                  setMileage(null);
                  setMileageStr("");
                }
              }
            }}
            value={mileageStr}
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
