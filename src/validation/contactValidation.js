import Joi from "joi";
import { en, rex } from "../controllers/const.js";

export const contactAddShema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    phoneNumber: Joi.string().required().min(3).max(20).pattern(rex),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.string().min(3).max(20),
    contactType:Joi.string().required().min(3).max(20).valid(...en),


})
export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20).pattern(rex),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.string().min(3).max(20),
    contactType:Joi.string().min(3).max(20).valid(...en),


});
