import { Either, left, right } from "@sweet-monads/either";
import axios from "axios";

export namespace CreateEstablishmentCommand {
    export type Payload = {
        cnpj: string;
        name: string;
        phone: string;
        email: string;
        cep: string;
        number: string;
        category: string;
        areaCode: string;
    }
    export type Response = {
        uuid: string;
        usernames: string;
        name: string;
        email: string;
        birthday: string;
    }
}

export class CreateEstablishmentCommand {

    static async execute({
        category,
        cep,
        cnpj,
        email,
        name,
        number,
        phone,
        areaCode
    }: CreateEstablishmentCommand.Payload): Promise<Either<Error, CreateEstablishmentCommand.Response>> {
        try {
            const response = await axios.post(`https://geraldo-backend.vercel.app/establishment_register`, {
                username: cnpj,
                name,
                email,
                houseNumber: number,
                postalCode: cep,
                phone,
                establishmentType: category,
                areaCode
            });
            return right(response.data);
        } catch (error: any) {
            let errorMessage = error.response.data.message
            if (Array.isArray(errorMessage)) {
                errorMessage = errorMessage.join("\n")
            }
            return left(new Error(errorMessage))
        }
    }
}