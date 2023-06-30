import Joi from "joi";

export const editProfileSchema = Joi.object({
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
    userName: Joi.string().required().messages({
        "string.empty": "User Name is not allowed to be empty",
        "any.required": "User Name is required"
    })
})

// export const getUserDetailSchema = Joi.object({
//     emailId: Joi.string().email().required().messages({
//         'string.email': 'Email must be a valid email address',
//         'any.required': 'Email is required'
//     })
// })