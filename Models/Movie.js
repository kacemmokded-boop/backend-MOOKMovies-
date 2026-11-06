const mongoose=require('mongoose')

const movieSchema=mongoose.Schema(
    {
        title:{type:String, required: true},
        description: {type:String, required: true},
        photo:{type:String, required: true},
        owner : {
            type : mongoose.Types.ObjectId,
            ref : "ListUser"
        }

    }
)
module.exports=mongoose.model('Movie',movieSchema)