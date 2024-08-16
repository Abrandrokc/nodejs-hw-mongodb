import Joi from "joi";
import { en, rex } from "../controllers/const.js";

export const contactAddShema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    phoneNumber: Joi.string().required().min(3).max(20).pattern(rex),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().required().min(3).max(20).valid(...en),
    photo:Joi.string()


})
export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20).pattern(rex),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid(...en),
     photo:Joi.string()


}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType')
