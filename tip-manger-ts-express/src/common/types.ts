import { Response } from "express";

export interface getUsers {
    firstName: string;
    lastName: string;
    emailId: string;
    password: String;
    dob: String;
}

export interface ICommonResponse<T = any> {
    statusCode: number;
    message: string;
    data?: T | [];
    error?: T | [];
}

export const ResponseHandler = (
    res: Response,
    statusCode: number,
    message: string,
    data?: [] | object,
    error?: [] | object
): ICommonResponse | Response => {
    return res.send({ statusCode, message, data, error });
};
