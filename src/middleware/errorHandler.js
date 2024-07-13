const errorHandler = (error, req, res, next) => {
    const { status = 500, massege } = error
    res.status(status).json({
        status,
        massege,
        data: error,
    })
}
export default errorHandler
