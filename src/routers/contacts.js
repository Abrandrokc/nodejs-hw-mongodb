import { Router } from "express";
import { getContactsRoute, getByIdRoute, postContactsRoute, patchContactsRoute, deleteContactsRoute } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middleware/isValidId.js";
import validateBody from "../middleware/validateBody.js";
import { contactAddShema, contactUpdateSchema } from "../validation/contactValidation.js";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";

const contactRouters = Router();

contactRouters.use(authenticate);

contactRouters.get("/", ctrlWrapper(getContactsRoute));
contactRouters.get("/:contactId", isValidId, ctrlWrapper(getByIdRoute));
contactRouters.post("/", upload.single("photo"), validateBody(contactAddShema), ctrlWrapper(postContactsRoute));
contactRouters.patch("/:contactId",upload.single("photo"), isValidId, validateBody(contactUpdateSchema), ctrlWrapper(patchContactsRoute));
contactRouters.delete("/:contactId", isValidId, ctrlWrapper(deleteContactsRoute));

export default contactRouters;
