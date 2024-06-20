import Contact from "../db/Contact.js";
export const getContacts = () => Contact.find()
export const getContactsId = contactId => Contact.findById(contactId)
