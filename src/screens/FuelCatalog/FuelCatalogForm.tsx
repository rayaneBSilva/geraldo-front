import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/themed";
import React, { ReactNode, useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { FuelCatalogProps, FuelCatalogRoute } from ".";
import FrequencyButton from "../../../components/button/frequencyButton";
import MainTitle from "../../../components/title/mainTitle";
import CustomButton from "../../components/button";
import FuelCatalogTypeEnum from "../../enum/FuelCatalogTypeEnum";
import vehicheComponentService from "../../services/VehicheComponentService";
import Validation from "../../validation";
import { fuelCatalog } from "./FuelCatalogStyles";
import { useAuth } from "../../context/authContext";
import FuelCatalogStore from "./FuelCatalogStore";

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
  children?: ReactNode;
};

const CustomInput = ({
  placeholder,
  icon: Icon,
  onChangeText,
  value,
  onPress,
  errorMessage,
  errorStyle,
  children,
}: InputProps) => {
  const isCalendarIcon = Icon === CalendarIcon;
  return (
    <View style={{ height: 80 }}>
      <View style={fuelCatalog.view}>
        {isCalendarIcon ? (
          <Pressable onPress={onPress}>
            <Image source={CalendarIcon} style={fuelCatalog.icon} />
          </Pressable>
        ) : (
          <Image source={Icon} style={fuelCatalog.icon} />
        )}

        {!children && (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={fuelCatalog.textInput}
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
                    width: 200,
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

const FuelCatalogForm = ({
  componentData,
}: {
  componentData: FuelCatalogProps;
}) => {
  const [type, setType] = useState("new");
  const {
    fuelType,
    setFuelType,
    fuelTitle,
    setFuelTitle,
    value,
    setValue,
    productStatus,
    setProductStatus,
    isRequiredFuelCatalogType,
    setIsRequiredFuelCatalogType,
    isRequiredFuelTitle,
    setIsRequiredFuelTitle,
    errorMessageFuelType,
    setErrorMessageFuelType,
    isRequiredValue,
    setIsRequiredValue,
    errorMessageFuelTitle,
    setErrorMessageFuelTitle,
    errorMessageValue,
    setErrorMessageValue,
    validateFuelCatalogEmptyField,
    validateFuelCatalogMessageError,
    validateRequiredFields,
    resetValues,
  } = FuelCatalogStore();

  // const { authState } = useAuth();

  useEffect(() => {
    if (componentData.fuelType) {
      setFuelType(componentData.fuelType);
      setFuelTitle(componentData.fuelTitle as string);

      setType("edit");
    }
  }, [componentData]);

  const handleCustomButtonPress = async () => {
    validateFuelCatalogEmptyField();
    validateFuelCatalogMessageError();

    if (errorMessageFuelType !== "" || errorMessageFuelTitle !== "") {
      return;
    }

    //   if (
    //     type === "edit" &&
    //     componentData?.kilometersLastExchange &&
    //     mileage !== null &&
    //     mileage > componentData?.kilometersLastExchange
    //   ) {
    //     const mileageErrorMessage = Validation.validateMileage(
    //       mileage,
    //       componentData.kilometersLastExchange
    //     );
    //     if (mileageErrorMessage !== "") {
    //       setErrorMessageMileage(mileageErrorMessage);
    //       return;
    //     } else {
    //       setErrorMessageMileage("");
    //     }

    if (validateRequiredFields()) {
      try {
        if (
          type === "edit"
          // componentData &&
          // componentData.componentId &&
          // authState?.token
        ) {
          //         await vehicheComponentService.updateComponent(
          //           componentData.componentId,
          //           authState.token,
          //           {
          //             fuelType: fuelType,
          //             dateLastExchange: date,
          //             kilometersLastExchange: mileage,
          //             maintenanceFrequency: frequency,
          //           },
          //           navigation,
          //           "Componente editado com sucesso!"
          //         );
        } else {
          //         await vehicheComponentService.save(
          //           {
          //             fuelType,
          //             dateLastExchange: date,
          //             kilometersLastExchange: mileage,
          //             maintenanceFrequency: frequency,
          //           },
          //           componentData.vehicleId,
          //           navigation,
          //           "Componente cadastrado com sucesso!"
          //         );
        }
        //       setErrorMessage("");
        //       setErrorMessageDate("");
        //       setErrorMessageMileage("");
        //       setErrorMessageFuelType("");
      } catch (error) {
        //       console.log(error);
        //       setErrorMessage("Dados inválidos");
        //       setErrorMessageDate("Dados inválidos");
        //       setErrorMessageMileage("Dados inválidos");
        //       setErrorMessageFuelType("Dados inválidos");
      }
    }
  };

  const handleCustomButtonCancel = async () => {
    resetValues();

    //   navigation.navigate("VehicleList" as never);
  };

  return (
    <View style={fuelCatalog.mainContainer}>
      <View>
        {type === "new" ? (
          <MainTitle title={"Cadastro de catálogo\nde combustíveis"} />
        ) : (
          <MainTitle title={`${componentData?.fuelType}`} />
        )}
        <Text style={fuelCatalog.paragraph}>
          Preencha os campos com as informações referentes a última troca do
          componente
        </Text>
      </View>
      <View style={fuelCatalog.fuelCatalogFormContainer}>
        <View style={fuelCatalog.containerLoginForm}>
          <CustomInput
            placeholder="Tipo do Combustível"
            icon={PranchetaIcon}
            onChangeText={(text) => setFuelType(text as FuelCatalogTypeEnum)}
            value={fuelType}
            errorMessage={Validation.generateErrorMessage(
              isRequiredFuelCatalogType,
              errorMessageFuelType
            )}
            errorStyle={{
              color:
                isRequiredFuelCatalogType || errorMessageFuelType !== ""
                  ? "red"
                  : "black",
            }}
          />
        </View>
        <View style={fuelCatalog.containerLoginForm}>
          <CustomInput
            placeholder="Título do Combustível"
            icon={PranchetaIcon}
            onChangeText={(text) => setFuelTitle(text)}
            value={fuelTitle}
            errorMessage={Validation.generateErrorMessage(
              isRequiredFuelTitle,
              errorMessageFuelTitle
            )}
            errorStyle={{
              color:
                isRequiredFuelTitle || errorMessageFuelTitle !== ""
                  ? "red"
                  : "black",
            }}
          />
        </View>
        <View style={fuelCatalog.containerLoginForm}>
          <CustomInput
            placeholder="Valor"
            icon={QuilometragemIcon}
            onChangeText={(text) => {
              if (text.trim() === "") {
                setValue(null);
              } else {
                const parsedValue = parseFloat(text);
                if (!isNaN(parsedValue)) {
                  setValue(parsedValue);
                } else {
                  setValue(null);
                }
              }
            }}
            value={value ? value.toString() : ""}
            errorMessage={Validation.generateErrorMessage(
              isRequiredValue,
              errorMessageValue
            )}
            errorStyle={{
              color:
                isRequiredValue || errorMessageValue !== "" ? "red" : "black",
            }}
          />
        </View>

        <View style={fuelCatalog.containerLoginForm}>
          <CustomInput
            placeholder={productStatus ? "Disponível" : "Indisponível"}
            icon={QuilometragemIcon}
            children={
              <FrequencyButton
                title={productStatus ? "Disponível" : "Indisponível"}
                options={["Indisponível", "Disponível"]}
                onSelect={(option) => {
                  setProductStatus(option === "Disponível");
                }}
                style={{ backgroundColor: "transparent", width: 150 }}
              />
            }
          />
        </View>
      </View>
      <View style={fuelCatalog.containerRow}></View>
      <CustomButton
        title="Cadastrar"
        onPress={handleCustomButtonPress}
        style={{ marginTop: 20 }}
      />
      <Text style={fuelCatalog.textButton} onPress={handleCustomButtonCancel}>
        Cancelar
      </Text>
    </View>
  );
};

export default FuelCatalogForm;
