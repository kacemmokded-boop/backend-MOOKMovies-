const express=require('express')

const { isAuth } = require('../Middlewares/isAuth')
const { addRate, getAllRates, getOneRate, updateRate, deleteRate, getRatesByMovie } = require('../Controllers/Rate')

const rateRouter=express.Router()

rateRouter.post('/addRate', isAuth,addRate)

rateRouter.get('/getAllRates',getAllRates)

rateRouter.get('/getRatesByMovie/:id',getRatesByMovie)

rateRouter.get('/getOneRate/:id',getOneRate)

rateRouter.put('/updateRate/:id',isAuth,updateRate)

rateRouter.delete('/deleteRate/:id',deleteRate)


module.exports=rateRouter