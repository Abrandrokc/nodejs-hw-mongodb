import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import dotenv from "dotenv";
import env from "./utils/env.js";
import { getContacts, getContactsId } from "./services/contacts.js";
export default function setupServer() {
    dotenv.config()
    const port = env("PORT","3000")

    const app = express()
     app.use(cors());
    app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
    );

    app.get("/contacts", async (req, res) => {

        const data = await getContacts()
        res.json({
            status: 200,
            data,
            message: "Successfully found contacts!"
        } )
    })
    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;


        try {
            const data = await getContactsId(contactId)
        if (!data) {
            res.status(404).json(
                {
                    massage: "Not found"
                }
            )
        }
        res.json({
            status: 200,
            data,
            message: `Successfully found contact with id ${contactId}!`
        })
       } catch (error) {
        console.log(error)
       }

    } )
    app.use((req, res) => {
        res.status(404).json({
            status: 404 ,
            masege: "Not found",
        })
    })

    app.listen(port, () => console.log(`Server is running on port ${port} `))
}
