import Joi from "joi";

export const signUpSchema = Joi.object({
    firstName: Joi.string().required().messages({
        "string.empty": "First Name is not allowed to be empty",
        "any.required": "First Name is required",
    }),
    lastName: Joi.string().required().messages({
        "string.empty": "Last Name is not allowed to be empty",
        "any.required": "Last Name is required",
    }),
    emailId: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
    }),
    dob: Joi.string().required().messages({
        "any.required": "dob is required",
    }),
});

export const signInSchema = Joi.object({
    emailId: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
    }),
});
