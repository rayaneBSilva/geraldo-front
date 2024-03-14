import { Either, left, right } from "@sweet-monads/either";
import axios from "axios";

export namespace FindAddressQuery {
    export type Response = {
        state: string;
        city: string;
        address: string;
        district: string;
    }
}

export class FindAddressQuery {

    static async execute(cep: string): Promise<Either<Error, FindAddressQuery.Response>> {
        try {
            const response = await axios.get(`https://geraldo-backend.vercel.app/find_address?cep=${cep}`);
            return right(response.data.data);
        } catch (error: any) {
            return left(new Error(error))
        }
    } 
}