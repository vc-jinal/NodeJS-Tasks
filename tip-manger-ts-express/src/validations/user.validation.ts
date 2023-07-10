import Joi from "joi";

export const updateUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).messages({
        "string.empty": "First Name is not allowed to be empty",
        "string.min": "First Name of min length should be 3",
        "string.max": "First Name of max length should be 10",
    }),
    lastName: Joi.string().min(3).max(10).messages({
        "string.empty": "Last Name is not allowed to be empty",
        "string.min": "Last Name of min length should be 3",
        "string.max": "Last Name of max length should be 10",
    }),
    emailId: Joi.string().email().messages({
        "string.email": "Email must is not allowed to be empty",
    }),
    password: Joi.string().min(5).max(8).messages({
        "string.empty": "Password must is not allowed to be empty",
        "string.min": "Password of min length should be 3",
        "string.max": "Password of max length should be 8",
    }),
    dob: Joi.string().messages({
        "string.empty": "Date of birth is not allowed to be empty",
    }),
});
