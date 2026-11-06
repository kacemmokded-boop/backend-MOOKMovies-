const express=require('express')

const { isAuth } = require('../Middlewares/isAuth')
const { addComment, getAllComments, updateComment, getOneComment, deleteComment, getCommentsByUser } = require('../Controllers/Comment')

const commentRouter=express.Router()

commentRouter.post('/addComment', isAuth,addComment)

commentRouter.get('/getAllComments',getAllComments)

commentRouter.get('/getOneComment/:id',getOneComment)

commentRouter.put('/updateComment/:id',updateComment)

commentRouter.delete('/deleteComment/:id',deleteComment)

commentRouter.get('/getCommentsByUser',isAuth,getCommentsByUser)


module.exports=commentRouter