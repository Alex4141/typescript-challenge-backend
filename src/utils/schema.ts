import Joi from "joi";

export const StaysSchema = Joi.object({
    bedrooms: Joi.number().optional(),
    bathrooms: Joi.number().optional(),
    beds: Joi.number().optional(),
    amenities: Joi.array().items(Joi.string()).optional()
});

export const CursorSchema = Joi.object({
    _id : Joi.number().integer().min(1).required()
});
