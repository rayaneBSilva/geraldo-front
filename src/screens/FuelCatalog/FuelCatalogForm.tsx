import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { FuelCatalogProps } from ".";
import FrequencyButton from "../../../components/button/frequencyButton";
import MainTitle from "../../../components/title/mainTitle";
import CustomButton from "../../components/button";
import FuelCatalogTypeEnum from "../../enum/FuelCatalogTypeEnum";
import Validation from "../../validation";
import { fuelCatalog } from "./FuelCatalogStyles";
import { useAuth } from "../../context/authContext";
import FuelCatalogStore from "./FuelCatalogStore";
import fuelCatalogService from "../../services/FuelCatalogService";

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
  keyboardType?: "default" | "decimal-pad";
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
  keyboardType,
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
            keyboardType={keyboardType}
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
                    width: 235,
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
        <Text style={[errorStyle, { paddingLeft: 55 }]}>{errorMessage}</Text>
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
  const navigation = useNavigation();
  const { authState } = useAuth();

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
    isRequiredFuelTitle,
    errorMessageFuelType,
    isRequiredValue,
    errorMessageFuelTitle,
    errorMessageValue,
    validateFuelCatalogEmptyField,
    validateFuelCatalogMessageError,
    validateRequiredFields,
    resetValues,
    clearMessageError,
    setInvalidDataErrorMessages,
  } = FuelCatalogStore();

  useEffect(() => {
    if (componentData.fuelType) {
      setFuelType(componentData.fuelType);
      setFuelTitle(componentData.fuelTitle as string);
      setValue(componentData.value as number);
      setProductStatus(componentData.productStatus as boolean);

      setType("edit");
    }
  }, [componentData]);

  const handleCustomButtonPress = async () => {
    clearMessageError();
    validateFuelCatalogEmptyField();
    validateFuelCatalogMessageError();

    if (
      errorMessageFuelType !== "" ||
      errorMessageFuelTitle !== "" ||
      errorMessageValue !== ""
    ) {
      return;
    }

    if (validateRequiredFields()) {
      try {
        if (type === "edit" && authState?.token && componentData.fuelId) {
          await fuelCatalogService.updateComponent(
            componentData.fuelId,
            authState.token,
            {
              fuelType,
              fuelTitle,
              value,
              productStatus,
            },
            navigation,
            "Catálogo atualizado com sucesso!"
          );
        } else {
          await fuelCatalogService.save(
            {
              fuelType,
              fuelTitle,
              value,
              productStatus,
            },
            componentData.establishmentId,
            navigation,
            "Catálogo cadastrado com sucesso!"
          );
        }
        clearMessageError();
      } catch (error) {
        console.log(error);
        setInvalidDataErrorMessages();
      }
    }
  };

  const handleCustomButtonCancel = async () => {
    resetValues();
    navigation.navigate("VehicleList" as never);
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
          Preencha os campos com as informações referentes ao catálogo de
          combustível
        </Text>
      </View>
      <View style={fuelCatalog.fuelCatalogFormContainer}>
        <View style={fuelCatalog.containerLoginForm}>
          <CustomInput
            placeholder="Tipo do Combustível"
            icon={PranchetaIcon}
            children={
              <FrequencyButton
                title={
                  componentData.fuelType
                    ? componentData.fuelType + "                              "
                    : " GASOLINE                              "
                }
                options={[
                  " GASOLINE                              ",
                  " DIESEL                                    ",
                  " ETHANOL                               ",
                ]}
                onSelect={(option) => {
                  if (
                    typeof option === "string" &&
                    option.trim() === "GASOLINE"
                  ) {
                    setFuelType(FuelCatalogTypeEnum.GASOLINE);
                  } else if (
                    typeof option === "string" &&
                    option.trim() === "DIESEL"
                  ) {
                    setFuelType(FuelCatalogTypeEnum.DIESEL);
                  } else if (
                    typeof option === "string" &&
                    option.trim() === "ETHANOL"
                  ) {
                    setFuelType(FuelCatalogTypeEnum.ETHANOL);
                  }
                }}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            }
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
                const textWithDot = text.replace(",", ".");
                setValue(parseFloat(textWithDot));
              }
            }}
            keyboardType="decimal-pad"
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
                title={
                  productStatus
                    ? "Disponível                                  "
                    : "Indisponível                               "
                }
                options={[
                  "Indisponível                               ",
                  "Disponível                                  ",
                ]}
                onSelect={(option) => {
                  if (typeof option === "string") {
                    setProductStatus(option.trim() === "Disponível");
                  }
                }}
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              />
            }
          />
        </View>
      </View>
      <View style={fuelCatalog.containerRow}></View>
      <CustomButton
        title={type === "new" ? "Cadastrar" : "Atualizar"}
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
