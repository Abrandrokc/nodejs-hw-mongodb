import { Schema, model } from "mongoose";

import { mongooseSaveError, setUpdateSettings } from "../utils/hook.js";
import {  email } from "../controllers/const.js";



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: email,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

}, {versionKey: false, timestamps: true});

userSchema.post("save", mongooseSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", mongooseSaveError);

const User = model("user", userSchema);

export default User;
