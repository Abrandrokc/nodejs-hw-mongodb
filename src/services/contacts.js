import Contact from "../db/Contact.js";
export const getContacts = () => Contact.find()
export const getContactsId = contactId => Contact.findById(contactId)
export const postContacts = data => Contact.create(data)
export const patchContacts = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options

    })
    if (!result || !result.value) return null
    const isNew = Boolean(result?.lastErrorObject?.upserted)
    return {
        data: result.value,
        isNew
    }
}
export const deleteContacts = filter => Contact.findOneAndDelete(filter)
