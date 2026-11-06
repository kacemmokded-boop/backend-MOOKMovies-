const Comment = require("../Models/Comment")

exports.addComment=async(req,res)=>{
    try {
        const {message , movieId}=req.body
        const addedcomment= new Comment({message,movieId, owner : req.user._id})
        await addedcomment.save()
        res.status(200).send({msg:"comment added", addedcomment})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not add the comment"}]})
    }
}

exports.getAllComments=async(req,res)=>{
    try {
        const comments= await Comment.find().populate('owner').populate('movieId')

        res.status(200).send({msg:"List of the comments", comments})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not get the list of the Comments"}]})
    }
}

exports.updateComment=async(req,res)=>{
    try {
        const {id}=req.params
      
        const updated = await Comment.findByIdAndUpdate(id,{$set: req.body})
   
        res.status(200).send({msg:"Comment updated", updated})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not update the comment"}]})
    }
}

exports.getOneComment=async(req,res)=>{
    try {
        const {id}=req.params
        const commentFound= await Comment.findById(id).populate('owner').populate('movieId')
   
        res.status(200).send({msg:"Comment founded", commentFound})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not find the comment"}]})
    }
}

exports.deleteComment=async(req,res)=>{
    try {
        const {id}=req.params
        await Comment.findByIdAndDelete(id)
   
        res.status(200).send({msg:"Comment deleted"})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not delete the comment"}]})
    }
}

exports.getCommentsByUser=async(req,res)=>{
    try {
         const UserComments =await Comment.find({ owner: req.user._id }).populate('movieId')

         res.status(200).send({msg:"Comments of user founded", UserComments})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not find the comments of the user"}]})
    }
}


