import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import env from "./utils/env.js";
import contactRouters from "./routers/contacts.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routers/auth-router.js";
import swaggerDocs from "./middleware/swaggerDocs.js";

const port = env("PORT", "3000");

export default function setupServer() {
    dotenv.config();

    const app = express();
    app.use(express.json());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.use(cookieParser());
    app.use(cors());

    app.use("/auth", authRouter);
    app.use("/contacts", contactRouters);
     app.use("/api-docs", swaggerDocs());
    app.use(notFoundHandler);
    app.use(errorHandler);
    app.listen(port, () => console.log(`Server is running on port ${port} `));
}
