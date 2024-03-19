import ServiceBase from "./ServiceBase";
interface Data {
  [key: string]: any;
}
class VehicheComponentService extends ServiceBase {
  async save(data: Data, navigation: any): Promise<void> {
    try {
      await this.post(data, "vehicle_components");
      navigation.navigate("LoginForm");
    } catch (error: any) {
      throw error;
    }
  }

  async updateComponent(
    data: Data,
    id: string,
    navigation: any
  ): Promise<void> {
    try {
      await this.put(data, `vehicle_components/${id}`);
      navigation.navigate("LoginForm");
    } catch (error: any) {
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
