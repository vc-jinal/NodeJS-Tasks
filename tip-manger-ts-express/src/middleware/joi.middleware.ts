import { NextFunction, Response, Request } from "express";

export const joiMiddleware = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let requestBody = req.body;
        if (!requestBody) {
            return res.send({ statusCode: 400, message: "Please Enter Valid Input" });
        } else {
            const { error } = schema.validate(requestBody);
            if (error) {
                return res.send({ statusCode: 400, message: "Error", error: error.details[0].message });
            }
            next();
        }
    };
};
