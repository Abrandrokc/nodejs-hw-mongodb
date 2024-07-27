import { contactListField, sortOrderList } from "../controllers/const.js";
import Contact from "../db/Contact.js";
import calcPagnationData from "../utils/calkPaginationsData.js";
export const getContacts = async ({ filter, page, perPage, sortBy = contactListField[0], sortOrder = sortOrderList[0] }) => {
    const skip = (page - 1) * perPage;
    const databaseQuery = Contact.find();

    if(filter.type) {
        databaseQuery.where("contactType").equals(filter.type);
    }
    if(filter.favorite !== undefined) {
        databaseQuery.where("favorite").equals(filter.favorite);
    }

    const items = await databaseQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});


    const totalItems = await Contact.find(databaseQuery.getQuery()).countDocuments();

    console.log(totalItems)
    const { totalPages, hasNextPage, hasPrevPage } = calcPagnationData({ total: totalItems, perPage, page });

    return {
        items,
        totalItems,
        page,
        perPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
    }
};
export const getContactsId = contactId => Contact.findById(contactId)
export const postContacts = data => Contact.create(data)
export const patchContacts = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
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
