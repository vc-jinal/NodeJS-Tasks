import Joi from "joi";

export const getAllPostOfUserSchema = Joi.object({
    keyValue: Joi.string().messages(
        {
            "string.empty": "key of that value is not allowed to be empty",
            "any.required": "key of that value is required"
        }
    ),
})

export const uploadPostSchema = Joi.object({
    description: Joi.string().messages(
        {
            "string.empty": "Description is not allowed to be empty",
            "any.required": "Description is required"
        }
    ),
    mentionUser: Joi.string().messages(
        {
            "string.empty": "mention User id is not allowed to be empty",
            "any.required": "mention User id is required"
        }
    ),
    commentData: Joi.string().messages(
        {
            "string.empty": "comment is not allowed to be empty",
            "any.required": "comment is required"
        }
    ),
    categories: Joi.string().messages({
        "string.empty": "Categories is not allowed to be empty",
        "any.required": "Categories is required"
    }),
    sharedUser: Joi.string().messages({
        "string.empty": "shared User Id is not allowed to be empty",
        "any.required": "shared User Id is required"
    })
})

export const createCommentOnPost = Joi.object({
    postId: Joi.string().required().messages({
        "string.empty": "Post Id is not allowed to be empty",
        "any.required": "Post Id is required"
    }),
    comment: Joi.string().required().messages({
        "string.empty": "comment is not allowed to be empty",
        "any.required": "comment is required"
    }),
    mentionUser: Joi.string().messages({
        "string.empty": "mention user id is not allowed to be empty",
        "any.required": "mention user id is required"
    })
})
