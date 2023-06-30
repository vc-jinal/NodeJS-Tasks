import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required().messages(
        {
            "string.empty": "Name is not allowed to be empty",
            "any.required": "Name is required"
        }
    ),
    emailId: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    phoneNo: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Phone number must be a 10-digit number',
        'any.required': 'Phone number is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    })
})

export const logInSchema = Joi.object({
    emailId: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    })
})

export const changePasswordSchema = Joi.object({
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    })
})

