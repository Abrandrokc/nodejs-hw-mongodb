
import  express  from "express"
import { getContactsRoute,getByIdRoute, postContactsRoute,  patchContactsRoute, deleteContactsRoute } from "../controllers/contacts.js"
import ctrlWrapper from "../utils/ctrlWrapper.js"
import isValidId from "../middleware/isValidId.js"
import validateBody from "../middleware/validateBody.js"
import { contactAddShema, contactUpdateSchema } from "../validation/contactValidation.js"
const contactRouters = express.Router()

     contactRouters.get("/", ctrlWrapper( getContactsRoute))
contactRouters.get("/:contactId",isValidId,validateBody(contactAddShema),ctrlWrapper(getByIdRoute))
contactRouters.post("/",validateBody(contactAddShema), ctrlWrapper(postContactsRoute))
contactRouters.patch("/:contactId",isValidId,validateBody(contactUpdateSchema), ctrlWrapper(patchContactsRoute))
     contactRouters.delete("/:contactId",isValidId, ctrlWrapper(deleteContactsRoute))
export default contactRouters
