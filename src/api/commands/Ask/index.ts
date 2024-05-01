import { Either, left, right } from "@sweet-monads/either";
import axios from "axios";

export namespace AskCommand {
    export type Payload = {
        token: string;
        question: string;
    }
    export type Response = {
        response: string;
    }
}

export class AskCommand {

    static async execute({
        question,
        token
    }: AskCommand.Payload): Promise<Either<Error, AskCommand.Response>> {
        try {
            const response = await axios.get(`https://geraldo-backend.vercel.app/chatMessage?question=${question}`, {
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