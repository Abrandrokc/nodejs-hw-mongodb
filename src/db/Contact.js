import { model, Schema } from "mongoose";
import { mongoError, setUpdateSettings } from "../utils/hook.js";
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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    photo: {
      type: String
    }
  },
  {
      timestamps: true,
      versionKey: false,

  }

);
contactSchema.post("save", mongoError)
contactSchema.pre("findOneAndUpdate", setUpdateSettings)
contactSchema.post("findOneAndUpdate", mongoError)

const Contact = model("contact", contactSchema);

export default Contact;


