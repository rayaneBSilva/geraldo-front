import ServiceBase from "./ServiceBase";
import axios from "axios";
import Config from "../utils/Config";

interface UserData {
  [key: string]: any;
}

class MilageUpdateService extends ServiceBase {

    async milageUpdate(kilometers: number, idVeiculo: number, token:string): Promise<any> {
    
        const result = await this.patch({ updateKilometers: kilometers }, `kilometers/${idVeiculo}`, token)

        return result.data; 
  }
}
const milageUpdateService = new MilageUpdateService;

export default milageUpdateService;
