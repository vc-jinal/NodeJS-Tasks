import Joi from "joi";

export const updateUserSchema = Joi.object({
    firstName: Joi.string().messages({
        "string.empty": "First Name is not allowed to be empty",
    }),
    lastName: Joi.string().messages({
        "string.empty": "Last Name is not allowed to be empty",
    }),
    emailId: Joi.string().email().messages({
        "string.email": "Email must is not allowed to be empty",
    }),
    password: Joi.string().messages({
        "string.empty": "Password must is not allowed to be empty",
    }),
    dob: Joi.string().messages({
        "string.empty": "Date of birth is not allowed to be empty",
    }),
});
