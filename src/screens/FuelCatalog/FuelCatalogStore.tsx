import React, { useState } from "react";
import Validation from "../../validation";

const FuelCatalogForm = () => {
  const [fuelType, setFuelType] = useState<string>("");
  const [fuelTitle, setFuelTitle] = useState<string>("");
  const [value, setValue] = useState<number | null>(null);
  const [productStatus, setProductStatus] = useState<boolean>(false);

  const [isRequiredFuelCatalogType, setIsRequiredFuelCatalogType] =
    useState(false);
  const [isRequiredFuelTitle, setIsRequiredFuelTitle] = useState(false);
  const [isRequiredValue, setIsRequiredValue] = useState(false);

  const [errorMessageFuelType, setErrorMessageFuelType] = useState("");
  const [errorMessageFuelTitle, setErrorMessageFuelTitle] = useState("");
  const [errorMessageValue, setErrorMessageValue] = useState("");

  const validateFuelCatalogEmptyField = () => {
    setIsRequiredFuelCatalogType(!fuelType);
    setIsRequiredFuelTitle(!fuelTitle);
    setIsRequiredValue(value === null || value === undefined);
  };

  const validateFuelCatalogMessageError = () => {
    const fuelTypeErrorMessage = Validation.validateFuelTypeComponent(fuelType);
    if (fuelTypeErrorMessage !== "") {
      setErrorMessageFuelType(fuelTypeErrorMessage);
    } else {
      setErrorMessageFuelType("");
    }

    const valueErrorMessage = Validation.validateValue(value as number);
  };

  const validateRequiredFields = () => {
    return (
      fuelType.trim() !== "" &&
      fuelTitle.trim() !== "" &&
      value?.toString().trim() !== ""
    );
  };

  const resetValues = () => {
    setFuelType("");
    setFuelTitle("");
    setValue(null);
    setProductStatus(false);
  };

  const clearMessageError = () => {
    setErrorMessageFuelType("");
    setErrorMessageFuelTitle("");
    setErrorMessageValue("");
  };

  const setInvalidDataErrorMessages = () => {
    setErrorMessageFuelType("Dados inválidos");
    setErrorMessageFuelTitle("Dados inválidos");
    setErrorMessageValue("Dados inválidos");
  };

  return {
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
  };
};

export default FuelCatalogForm;
