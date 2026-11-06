const mongoose=require('mongoose')

const commentSchema=mongoose.Schema(
    {
        message: {type:String, required: true},
        owner : {
            type : mongoose.Types.ObjectId,
            ref : "ListUser"
        },
        movieId : {
            type : mongoose.Types.ObjectId,
            ref : "Movie"
        }
    },
    { timestamps: true }
)
module.exports=mongoose.model('Comment',commentSchema)