import ToastComponent from "../components/toastMessage";
import { useAuth } from "../context/authContext";
import ServiceBase from "./ServiceBase";
import axios from "axios";

interface Data {
  [key: string]: any;
}

export interface ComponentData {
  id: number;
  componentType: string;
  dateLastExchange: string;
  maintenanceFrequency: number;
  kilometersLastExnchange: number;
}

export interface HistoryComponentData {
  id: number;
  model: string;
}

class VehicheComponentService extends ServiceBase {
  async listAllComponents(token: string): Promise<ComponentData[]> {
    try {
      const response = await this.get("components", token);
      return response.data.data.map((component: any) => ({
        id: component.id,
        componentType: component.componentType,
        dateLastExchange: component.dateLastExchange,
        maintenanceFrequency: component.maintenanceFrequency,
        kilometersLastExnchange: component.kilometersLastExnchange,
      }));
    } catch (error: any) {
      console.error("Erro ao obter veículos", error);
      console.log(error.message);
      console.log(error.response);
      console.log(error.toJSON());
      return [];
    }
  }

  async deleteComponent(
    componentId: number,
    token: string,
    message?: string
  ): Promise<void> {
    try {
      await this.delete(`vehicle_components/${componentId}`, token);
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

  async save(
    id: number,
    data: Data,
    vehicleId: number,
    navigation: any,
    message?: string
  ): Promise<void> {
    try {
      await this.post(data, "vehicle_components");
      message &&
        ToastComponent({
          type: "success",
          text1: message,
        });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigation.navigate("ViewCarScreen", { id });
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
    id: number,
    token: string,
    data: Data,
    navigation: any,
    message?: string
  ): Promise<void> {
    try {
      await this.put(data, `vehicle_components/${id}`, token);
      console.log(message);

      message &&
        ToastComponent({
          type: "success",
          text1: message,
        });

      await new Promise((resolve) => setTimeout(resolve, 3000));

      navigation.navigate("ViewCarScreen", { id });
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

  async getComponentById(id: string): Promise<Object | null> {
    try {
      return await this.get(`vehicle_components/${id}`, "");
    } catch (error) {
      console.error("Erro ao buscar o componente por ID:", error);
      return null;
    }
  }

  async getHistoryComponent(
    componentId: string,
    token: string
  ): Promise<ComponentData[]> {
    try {
      const response = await this.get(
        `historic/component/${componentId}`,
        token
      );
      return response.data.data.map((component: any) => ({
        componentType: component.componentType,
        dateLastExchange: component.dateLastExchange,
        maintenanceFrequency: component.maintenanceFrequency,
        kilometersLastExnchange: component.kilometersLastExnchange,
      }));
    } catch (error: any) {
      console.error("Erro ao obter dados", error);
      console.log(error.message);
      console.log(error.response);
      console.log(error.toJSON());
      return [];
    }
  }
}

const vehicheComponentService = new VehicheComponentService();

export default vehicheComponentService;
