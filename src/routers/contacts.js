
import { Router } from "express";
import { getContactsRoute, getByIdRoute, postContactsRoute, patchContactsRoute, deleteContactsRoute } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactRouters = Router();

contactRouters.get("/", ctrlWrapper(getContactsRoute));
contactRouters.get("/:contactId", ctrlWrapper(getByIdRoute));
contactRouters.post("/", ctrlWrapper(postContactsRoute));
contactRouters.patch("/:contactId", ctrlWrapper(patchContactsRoute));
contactRouters.delete("/:contactId", ctrlWrapper(deleteContactsRoute));

export default contactRouters;
