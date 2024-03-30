import ComponentTypeEnum from "../enum/ComponentTypeEnum";
import FuelCatalogTypeEnum from "../enum/FuelCatalogTypeEnum";

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
  static validateDate(date: string | undefined): string {
    if (date) {
      const currentDate = new Date();
      const inputDate = new Date(date);

      if (inputDate > currentDate) {
        return "A data de atualização não pode ser maior do que a data atual";
      }
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

  static validateTypeComponent(componentType: string | undefined): string {
    if (
      !(
        componentType === ComponentTypeEnum.AIR_FILTER ||
        componentType === ComponentTypeEnum.BALANCE ||
        componentType === ComponentTypeEnum.MOTOR_OIL
      )
    ) {
      return "O tipo do componente é invalido";
    }
    return "";
  }

  static validateFuelTypeComponent(componentType: string): string {
    if (
      !(
        componentType === FuelCatalogTypeEnum.DIESEL ||
        componentType === FuelCatalogTypeEnum.ETHANOL ||
        componentType === FuelCatalogTypeEnum.GASOLINE
      )
    ) {
      return "O tipo do combustível é invalido";
    }
    return "";
  }

  static validateValue(value: number): string {
    if (value < 0) {
      return "O valor não pode ser menor que 0";
    }
    return "";
  }
}

export default Validation;
