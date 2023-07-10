import Joi from "joi";

export const postPlaceDetailSchema = Joi.object({
    placeName: Joi.string().min(3).max(10).required().messages({
        "string.empty": "Place Name is not allowed to be empty",
        "any.required": "Place Name is required",
        "string.min": "Place Name of min length should be 3",
        "string.max": "Place Name of max length should be 10",
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
