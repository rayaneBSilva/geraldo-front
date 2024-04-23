import { Either, left, right } from "@sweet-monads/either";
import axios from "axios";

export namespace FindEstablishments {
    export type Params = {
        lat: number;
        long: number;
    }
    export type Response = Array<{
        address: {
            longitude: number;
            latitude: number;
        }
    }>
}

export class FindEstablishments {

    static async execute(params: FindEstablishments.Params): Promise<Either<Error, FindEstablishments.Response>> {
        try {
            const response = await axios.get(`https://geraldo-backend.vercel.app/find_address?lat=${params.lat}&long=${params.long}`);
            return right(response.data.data);
        } catch (error: any) {
            return left(new Error(error))
        }
    } 
}