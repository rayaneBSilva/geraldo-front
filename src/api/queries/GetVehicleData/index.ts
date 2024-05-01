import { Either, left, right } from "@sweet-monads/either";
import axios from "axios";

export namespace GetVehicleData {
    export type Params = {
        token: string;
        vehicleId: number;
    }
    export type Response = {
        model: string;
        plate: string;
        year: string;
        kilometers: number;
    }
}

export class GetVehicleData {

    static async execute({
        token,
        vehicleId
    }: GetVehicleData.Params): Promise<Either<Error, GetVehicleData.Response>> {
        try {
            const response = await axios.get(`https://geraldo-backend.vercel.app/vehicles/${vehicleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return right(response.data.data);
        } catch (error: any) {
            return left(new Error(error))
        }
    } 
}