
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors/index')
const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ') ){
        throw new UnauthenticatedError('No Token Provided')
    }

    const token = authHeader.split(' ')[1]
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decode
        req.user = {id,username}
        next()
    }
    catch(error){
        throw new UnauthenticatedError('NOt Authorized to access this route')
    }
   
}

module.exports = authenticationMiddleware