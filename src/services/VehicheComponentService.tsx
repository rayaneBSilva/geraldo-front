import ToastComponent from "../components/toastMessage";
import ServiceBase from "./ServiceBase";
interface Data {
  [key: string]: any;
}
class VehicheComponentService extends ServiceBase {
  async save(
    data: Data,
    vehicleId: number,
    navigation: any,
    message?: string
  ): Promise<void> {
    try {
      await this.post(data, "vehicle_components");
      navigation.navigate("LoginForm");

      message &&
        ToastComponent({
          type: "success",
          text1: message,
        });
    } catch (error: any) {
      console.log(error.response.data);
      const errors = error.response.data.message;
      for (let index = 0; index < errors.length; index++) {
        ToastComponent({
          type: "error",
          text1: "Erro",
          text2: errors[index],
        });
      }

      throw error;
    }
  }

  async updateComponent(
    id: number,
    data: Data,
    navigation: any,
    message?: string
  ): Promise<void> {
    try {
      await this.put(data, `vehicle_components/${id}`);
      navigation.navigate("LoginForm");
      message &&
        ToastComponent({
          type: "success",
          text1: message,
        });
    } catch (error: any) {
      ToastComponent({
        type: "error",
        text1: "Erro",
        text2: error.message,
      });
      throw error;
    }
  }

  async getComponentById(id: string): Promise<Object | null> {
    try {
      return await this.get(`vehicle_components/${id}`);
    } catch (error) {
      console.error("Erro ao buscar o componente por ID:", error);
      return null;
    }
  }
}

const vehicheComponentService = new VehicheComponentService();

export default vehicheComponentService;
