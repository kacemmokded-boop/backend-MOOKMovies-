const express=require('express')
const { addMovie, getAllMovies, getOneMovie, updateMovie, deleteMovie, getMoviesByUser } = require('../Controllers/Movie')
const { isAuth } = require('../Middlewares/isAuth')

const movieRouter=express.Router()

movieRouter.post('/addMovie',isAuth,addMovie)

movieRouter.get('/getAllMovies',getAllMovies)

movieRouter.get('/getOneMovie/:id',getOneMovie)

movieRouter.put('/updateMovie/:id',updateMovie)

movieRouter.delete('/deleteMovie/:id',deleteMovie)

movieRouter.get('/getMoviesByUser', isAuth,getMoviesByUser)

module.exports=movieRouter