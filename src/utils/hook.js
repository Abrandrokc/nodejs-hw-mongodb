export const mongoError = (error, data, next) => {
    error.status = 400
 next()
 }
