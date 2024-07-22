import createHttpError from "http-errors";
import { getContacts, getContactsId, postContacts, patchContacts, deleteContacts } from "../services/contacts.js";

export const getContactsRoute = async (req, res) => {
    const contacts = await getContacts();
    res.status(200).json({ status: 200, message: "Successfully retrieved contacts!", data: contacts });
};

export const getByIdRoute = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactsId(contactId);
    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(200).json({ status: 200, message: `Successfully retrieved contact with id ${contactId}`, data: contact });
};

export const postContactsRoute = async (req, res) => {
    const contact = await postContacts(req.body);
    res.status(201).json({ status: 201, message: "Successfully created a contact!", data: contact });
};

export const patchContactsRoute = async (req, res) => {
    const { contactId } = req.params;
    const result = await patchContacts({ _id: contactId }, req.body);
    if (!result) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(200).json({ status: 200, message: "Successfully patched a contact!", data: result.data });
};

export const deleteContactsRoute = async (req, res) => {
    const { contactId } = req.params;
    const result = await deleteContacts({ _id: contactId });
    if (!result) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(204).json({ status: 204, message: "Successfully deleted a contact!" });
};
