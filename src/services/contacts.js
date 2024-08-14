import { contactListField, sortOrderList } from "../controllers/const.js";
import Contact from "../db/Contact.js";
import calcPagnationData from "../utils/calkPaginationsData.js";

export const getContacts = async ({ filter, page, perPage, sortBy = contactListField[0], sortOrder = sortOrderList[0], userId }) => {
  const skip = (page - 1) * perPage;
  const databaseQuery = Contact.find({ userId });
  if (filter.type) {
    databaseQuery.where("contactType").equals(filter.type);
  }
  if (filter.favorite) {
    databaseQuery.where("favorite").equals(filter.favorite);
  }
  const items = await databaseQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });

  const totalItems = await Contact.find(databaseQuery.getQuery()).countDocuments();
  const { totalPages, hasNextPage, hasPrevPage } = calcPagnationData({ total: totalItems, perPage, page });

  return {
    items,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export const getContactsId = (contactId, userId) => Contact.findOne({ _id: contactId, userId });

export const postContacts = data => Contact.create(data);

export const patchContacts = async (filter, data, options = {}) => {
    try {
        const result = await Contact.findOneAndUpdate(filter, data, {
              includeResultMetadata: true,
            ...options
        });
        if (!result || !result.value) {
            console.log("No document found to update.");
            return null;
        }
        const isNew = Boolean(result.lastErrorObject?.upserted);
        return {
            data: result.value,
            isNew
        };
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error; 
    }
};

export const deleteContacts = filter => Contact.findOneAndDelete(filter);
