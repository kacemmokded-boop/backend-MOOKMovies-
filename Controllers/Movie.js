const Movie = require("../Models/Movie")

exports.addMovie=async(req,res)=>{
    try {
        const addedmovie= new Movie({...req.body, owner : req.user._id})
        await addedmovie.save()
        res.status(200).send({msg:"movie added", addedmovie})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not add the movie"}]})
    }
}
exports.getAllMovies=async(req,res)=>{
    try {
        const movies= await Movie.find().populate('owner')
   
        res.status(200).send({msg:"List of the movies", movies})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not get the list of the Movies"}]})
    }
}

exports.getOneMovie=async(req,res)=>{
    try {
        const {id}=req.params
        const found= await Movie.findById(id).populate('owner')
   
        res.status(200).send({msg:"The movie is founded", found})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not find the Movie"}]})
    }
}

exports.updateMovie=async(req,res)=>{
    try {
        const {id}=req.params
        await Movie.findByIdAndUpdate(id,{$set:req.body})
   
        res.status(200).send({msg:"The movie is updated"})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not update the Movie"}]})
    }
}

exports.deleteMovie=async(req,res)=>{
    try {
        const {id}=req.params
        await Movie.findByIdAndDelete(id)
   
        res.status(200).send({msg:"The movie is deleted"})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not delete the Movie"}]})
    }
}

exports.getMoviesByUser=async(req,res)=>{
    try {
         const UserMovies =await Movie.find({ owner: req.user._id })

         res.status(200).send({msg:"Movies of user founded", UserMovies})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not find the Movies of the user"}]})
    }
}