import Joi from "joi";

export const postPlaceDetailSchema = Joi.object({
    placeName: Joi.string().required().messages({
        "string.empty": "Place Name is not allowed to be empty",
        "any.required": "Place Name is required",
    }),
    billAmount: Joi.number().required().messages({
        "number.empty": "Bill Amount is not allowed to be empty",
        "any.required": "Bill Amount is required",
    }),
    tipAmount: Joi.number().required().messages({
        "number.email": "Tip Amount is not allowed to be empty",
        "any.required": "Tip Amount is required",
    }),
});
