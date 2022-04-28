

const itWorks =(req, res, next) => {
    res.status(200).send({
        message: 'inWorks'
    })
    next();
}

const errors = (req, res, next,text,statusNumber) => {
    const error =new Error(text)
    error.status=statusNumber;
    next(error);
}

module.exports ={
    itWorks,
    errors
}