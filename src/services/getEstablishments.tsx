import axios, { AxiosResponse } from "axios";
import ServiceBase from "./ServiceBase";
import { left, right } from "@sweet-monads/either";


class GetEstablishments extends ServiceBase {
  async closestEstablishments (latitude: number, longitude: number, fuelType: string, token: string): Promise<any> {
    try {

      const endpoint = `https://geraldo-backend.vercel.app/establishments?latitude=${latitude}&longitude=${longitude}`;

      const response: AxiosResponse = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.data[0].fuels)
    
      return right(response)
    } catch (error: any) {
      return left(new Error(error));
    }
  }
}

const getEstablishments = new GetEstablishments();

export default getEstablishments;