const mongoose=require('mongoose')

const rateSchema=mongoose.Schema(
    {
        rate: {type:Number,min: 1,max: 5, required: true},
        owner : {
            type : mongoose.Types.ObjectId,
            ref : "ListUser"
        },
        movieId : {
            type : mongoose.Types.ObjectId,
            ref : "Movie"
        }
    }
)
module.exports=mongoose.model('Rate',rateSchema)