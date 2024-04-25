import axios, { AxiosResponse } from "axios";
import ServiceBase from "./ServiceBase";
import { left, right } from "@sweet-monads/either";


class GetEstablishmentsOrderedByPrice extends ServiceBase {
  async closestEstablishments (latitude: number, longitude: number, fuelType: string, token: string): Promise<any> {
    try {

      const endpoint = `https://geraldo-backend.vercel.app/establishments_by_price?latitude=${latitude}&longitude=${longitude}&fuelType=${fuelType}`;

      const response: AxiosResponse = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      

      return right(response)
    } catch (error: any) {
      return left(new Error(error));
    }
  }
}

const getEstablishmentsOrderedByPrice = new GetEstablishmentsOrderedByPrice();

export default getEstablishmentsOrderedByPrice;