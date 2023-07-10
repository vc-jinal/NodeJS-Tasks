export const joiMiddleware = (schema) => {
    return (req, res, next) => {
        let requestBody = req.body;
        if (!requestBody) {
            return res.send({ statusCode: 400, message: "Please Enter Valid Input" });
        }
        else {
            const { error } = schema.validate(requestBody);
            if (error) {
                return res.send({ statusCode: 400, message: "Error", error: error.details[0].message });
            }
            next();
        }
    }
}