import Joi from "joi";
import { email } from "../controllers/const.js";



export const userSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(email).required(),
    password: Joi.string().min(6).required(),
})

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(email).required(),
    password: Joi.string().min(6).required(),
})
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
