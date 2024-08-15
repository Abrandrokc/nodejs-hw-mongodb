import createHttpError from "http-errors";
import { getContactsId, getContacts, postContacts, patchContacts, deleteContacts } from "../services/contacts.js";
import parsePaginationParams from "../utils/parsPaginationsParams.js";
import parseSortParams from "../utils/parseSortParams.js";
import parseContactsFitlerParams from "../utils/parseContactFilterParams.js";
import { contactListField } from "./const.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import env from "../utils/env.js";

export const getByIdRoute = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const data = await getContactsId(contactId, userId);
  if (!data) {
    throw createHttpError(401, "Contact not found", { message: "Contact not found" });
  }
  res.json({
    status: 200,
    data,
    message: `Successfully found contact with id ${contactId}!`
  });
};

export const getContactsRoute = async (req, res) => {
  const { query } = req;
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, contactListField);
  const filter = parseContactsFitlerParams(query);

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId
  });
  res.json({
    status: 200,
    data,
    message: "Successfully found contacts!"
  });
};

export const postContactsRoute = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await postContacts({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: data
  });
};

export const patchContactsRoute = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

    const result = await patchContacts({ _id: contactId, userId }, {
    ...req.body,
    photo: photoUrl,
  });


  if (!result) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result
  });
        console.log('Patch result:', result);
};

export const deleteContactsRoute = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;


  const result = await deleteContacts({ _id: contactId, userId });
  if (!result) {
    throw createHttpError(404, "Contact not found");
  }
  res.status(204).json({
    status: 204,
    message: "Successfully deleted a contact!"
  });
};

