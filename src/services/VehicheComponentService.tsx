import ToastComponent from "../components/toastMessage";
import ServiceBase from "./ServiceBase";
interface Data {
  [key: string]: any;
}
class VehicheComponentService extends ServiceBase {
  async save(data: Data, navigation: any, message?: string): Promise<void> {
    try {
      await this.post(data, "vehicle_components");
      navigation.navigate("LoginForm");

      message &&
        ToastComponent({
          type: "success",
          text1: message,
        });
    } catch (error: any) {
      console.log(error);
      ToastComponent({
        type: "error",
        text1: "Erro",
        text2: error.message,
      });
      throw error;
    }
  }

  async updateComponent(
    id: number,
    vehicleId: number,
    userId: number,
    data: Data,
    navigation: any,
    message?: string
  ): Promise<void> {
    try {
      await this.put(data, `vehicle_components/${userId}/${id}/${vehicleId}/`);
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
