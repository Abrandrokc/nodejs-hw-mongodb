import { model, Schema } from "mongoose";
import {  rex } from "../controllers/const.js";
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
        type: String,
        match:   rex,
      required: true
    },
    email: {
      type: String,
      required: false
    },
    isFavourite: {
      type: Boolean,
      default: false
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal'
    }
  },
  {
      timestamps: true,
      versionKey: false,

  }

);
const Contact = model("contact", contactSchema);

export default Contact;


