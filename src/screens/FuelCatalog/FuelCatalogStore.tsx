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
    setIsRequiredFuelCatalogType(fuelType ? false : true);
    setIsRequiredFuelTitle(fuelTitle ? false : true);
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
    setIsRequiredFuelCatalogType,
    isRequiredFuelTitle,
    setIsRequiredFuelTitle,
    isRequiredValue,
    setIsRequiredValue,
    errorMessageFuelType,
    setErrorMessageFuelType,
    errorMessageFuelTitle,
    errorMessageValue,
    setErrorMessageValue,
    setErrorMessageFuelTitle,
    validateFuelCatalogEmptyField,
    validateFuelCatalogMessageError,
    validateRequiredFields,
    resetValues,
  };
};

export default FuelCatalogForm;
