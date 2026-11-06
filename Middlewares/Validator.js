const { body,validationResult } = require('express-validator');

exports.validSignUp= [
    body('email','wrong format email').isEmail(),
    body('password','wrong password format').isLength({min:8}).bail().isAlphanumeric(),
]

exports.validation=(req,res,next)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send(errors)
    }
    next()
}