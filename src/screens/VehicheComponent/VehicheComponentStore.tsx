import { useState } from "react";

const VehicheComponentStore = () => {
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
  const [showPicker, setShowPicker] = useState(false);

  const validateVehicleComponentEmptyField = () => {
    setIsRequiredDate(!date);
    setIsRequiredMileage(mileage === null || mileage === undefined);
    setIsRequiredFrequency(frequency === null || frequency === undefined);
  };

  const validateRequiredFields = () => {
    return (
      componentType?.trim() !== "" &&
      date !== null &&
      mileage?.toString().trim() !== "" &&
      frequency?.toString().trim() !== ""
    );
  };

  const resetValues = () => {
    setComponentType(null);
    setDate("");
    setMileage(null);
    setMileageStr("");
    setFrequency(null);
  };

  const clearMessageError = () => {
    setErrorMessage("");
    setErrorMessageDate("");
    setErrorMessageMileage("");
    setErrorMessageTypeComponente("");
  };

  const setInvalidDataErrorMessages = () => {
    setErrorMessage("Dados inválidos");
    setErrorMessageDate("Dados inválidos");
    setErrorMessageMileage("Dados inválidos");
    setErrorMessageTypeComponente("Dados inválidos");
  };

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

  return {
    isRequiredDate,
    isRequiredMileage,
    isRequiredFrequency,
    componentType,
    setComponentType,
    date,
    setDate,
    dateSave,
    setDateSave,
    mileage,
    setMileage,
    mileageStr,
    setMileageStr,
    frequency,
    setFrequency,
    errorMessage,
    errorMessageDate,
    setErrorMessageDate,
    errorMessageMileage,
    setErrorMessageMileage,
    showPicker,
    setShowPicker,
    validateVehicleComponentEmptyField,
    validateRequiredFields,
    resetValues,
    clearMessageError,
    setInvalidDataErrorMessages,
    formatDate,
    handleSelectFrequency,
  };
};

export default VehicheComponentStore;
