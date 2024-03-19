class Validation {
  static generateErrorMessage(
    isRequired: boolean,
    errorMessage: string
  ): string {
    if (isRequired) {
      return "Campo obrigatório";
    } else if (errorMessage !== "") {
      return errorMessage;
    }
    return "";
  }
  static validateDate(date: string): string {
    const currentDate = new Date();
    const inputDate = new Date(date);

    if (inputDate > currentDate) {
      return "A data de atualização não pode ser maior do que a data atual";
    }

    return "";
  }

  static validateMileage(
    currentMileage: number,
    previousMileage?: number
  ): string {
    if (
      previousMileage !== undefined &&
      currentMileage !== null &&
      currentMileage > previousMileage
    ) {
      return "A quilometragem da última troca não pode ser maior do que a quilometragem atual";
    }

    return "";
  }
}

export default Validation;
