import { model, Schema } from "mongoose";
import { mongoError } from "../utils/hook.js";
import { en, rex } from "../controllers/const.js";
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
      enum: en,
      required: true,
      default: 'personal'
    }
  },
  {
      timestamps: true,
      versionKey: false,

  }

);
contactSchema.post("save", mongoError)
contactSchema.post("findOneAndUpdate", function (next) {
    this.opthions.new = true
    this.opthions.runValidators = true
    next()
})
contactSchema.post("findOneAndUpdate", mongoError)

const Contact = model("contact", contactSchema);

export default Contact;


