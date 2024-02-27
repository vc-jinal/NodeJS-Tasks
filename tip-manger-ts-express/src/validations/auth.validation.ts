import Joi from "joi";

export const signUpSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required().messages({
        "string.empty": "First Name is not allowed to be empty",
        "any.required": "First Name is required",
        "string.min": "First Name of min length should be 3",
        "string.max": "First Name of max length should be 10",
    }),
    lastName: Joi.string().min(3).max(10).required().messages({
        "string.empty": "Last Name is not allowed to be empty",
        "any.required": "Last Name is required",
        "string.min": "Last Name of min length should be 3",
        "string.max": "Last Name of max length should be 10",
    }),
    emailId: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(5).max(8).required().messages({
        "any.required": "Password is required",
        "string.min": "Password of min length should be 3",
        "string.max": "Password of max length should be 8",
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
    password: Joi.string().min(5).max(8).required().messages({
        "any.required": "Password is required",
        "string.min": "Password of min length should be 3",
        "string.max": "Password of max length should be 8",
    }),
});
