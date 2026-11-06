const express=require('express')
const { SignUp, SignIn, UpdateProfil, DeleteProfil, getAllUsers, DeleteUser } = require('../Controllers/User');
const { validSignUp, validation } = require('../Middlewares/Validator');
const { isAuth } = require('../Middlewares/isAuth');
const userRouter=express.Router()

userRouter.post('/SignUp',validSignUp, validation,SignUp)

userRouter.post('/SignIn',validSignUp, validation,SignIn)

userRouter.get('/CurrentUser',isAuth,(req,res)=>res.send(req.user))

userRouter.put('/UpdateProfil/:id', UpdateProfil)

userRouter.delete('/DeleteProfil/:id',DeleteProfil)

userRouter.get('/getAllUsers',getAllUsers)

userRouter.delete('/DeleteUser/:id',DeleteUser)



module.exports=userRouter