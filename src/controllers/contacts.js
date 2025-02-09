import createHttpError from "http-errors";
import { getContactsId, getContacts, postContacts,  patchContacts, deleteContacts } from "../services/contacts.js";

export const getByIdRoute = async (req, res) => {
        const { contactId } = req.params;



            const data = await getContactsId(contactId)
        if (!data) {
          throw createHttpError(401,"Contact not found",{message: "Contact not found"})
        }
        res.json({
            status: 200,
            data,
            message: `Successfully found contact with id ${contactId}!`
        })


    }
export const getContactsRoute= async (req, res) => {

        const data = await getContacts()
        res.json({
            status: 200,
            data,
            message: "Successfully found contacts!"
        } )
    }
export const postContactsRoute = async (req, res) => {
    const data = await postContacts(req.body)
    res.status(201).json(
        {
                status: 201,
		message: "Successfully created a contact!",
		data: data

            }



    )
}
export const patchContactsRoute = async (req, res) => {
    const id = req.params
    const result = await patchContacts({ _id: id }, req.body)
       if (!result) {
        throw createHttpError(404, "Contact not found")

    }
    res.status(200).json(
        {status: 200,
	message: "Successfully patched a contact!",
            data: result.data
        }
    )
}
export const deleteContactsRoute = async (req, res) => {
    const id = req.params
    const result = await deleteContacts({ _id: id })
    if (!result) {
        throw createHttpError(404, "Contact not found")

    }
res.status(204).json(
        {status: 204,
	message: "Successfully delete a contact!",

        }
    )
}
