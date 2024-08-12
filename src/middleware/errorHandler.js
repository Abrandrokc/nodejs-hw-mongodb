import { HttpError } from "http-errors";

const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (error instanceof HttpError) {
        const { status = 500, massege } = error
        res.status(status).json({
            status,
            massege,
            data: error,

        })
    }
 const { status = 500, massege= "Somethink wrong" } = error
        res.status(status).json({
            status,
            massege,
            data: error.massege,

        })

}
export default errorHandler
