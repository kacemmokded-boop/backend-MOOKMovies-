var jwt = require('jsonwebtoken');
const User = require('../Models/User');
exports.isAuth=async(req,res,next)=>{
    try {
        const token=req.header('authorized')
        var decoded = jwt.verify(token, process.env.privateKey)
        if (!decoded) {
            return res.status(400).send("wrong token")
        }
        const user= await User.findById(decoded.id)
        req.user=user
        next()
    } catch (error) {
        res.status(400).send({errors:[{msg:"Not authorized"}]})
    }
}