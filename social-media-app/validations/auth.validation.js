import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required().messages(
        {
            "string.empty": "Name is not allowed to be empty",
            "any.required": "Name is required"
        }
    ),
    emailId: Joi.string().email().required(),
    phoneNo: Joi.string().pattern(/^\d{10}$/).required(),
    password: Joi.string().required()
})
