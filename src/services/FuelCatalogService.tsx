import ToastComponent from "../components/toastMessage";
import ServiceBase from "./ServiceBase";

interface Data {
  [key: string]: any;
}

class FuelCatalogService extends ServiceBase {
  async save(data: Data, navigation: any, message?: string): Promise<void> {
    try {
      await this.post(data, "fuels");

      console.log("LOG save catalog");

      message &&
        ToastComponent({
          type: "success",
          text1: message,
        });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigation.navigate("MapScreen");
    } catch (error: any) {
      console.log(error.response.data);
      const errors = error.response.data.message;
      ToastComponent({
        type: "error",
        text1: "Erro",
        text2: errors,
      });

      throw error;
    }
  }

  async updateComponent(
    fuelId: number,
    token: string,
    data: Data,
    navigation: any,
    message?: string
  ): Promise<void> {
    try {
      await this.put(data, `fuels/${fuelId}`, token);
      message &&
        ToastComponent({
          type: "success",
          text1: message,
        });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigation.navigate("VehicleList");
    } catch (error: any) {
      console.log("erro", error.response);
      ToastComponent({
        type: "error",
        text1: "Erro",
        text2: error.message,
      });
      throw error;
    }
  }
}

const fuelCatalogService = new FuelCatalogService();

export default fuelCatalogService;
