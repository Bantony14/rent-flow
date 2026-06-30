const errorMiddleware = (err, req, res, next) => {

    console.log(err);
    console.log(err.filed)


    err.statusCode = err.statusCode || 400;
    err.message = err.message || "something wents wrong"

    res.status(err.statusCode).json({
        message: err.message
    })
}

export default errorMiddleware