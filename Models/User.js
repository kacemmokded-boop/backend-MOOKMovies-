const mongoose=require('mongoose')

const userSchema=mongoose.Schema(
    {
        name:String,
        email: {type:String, unique:true, required: true},
        password:{type:String, required: true},
        photo:{type:String, required: true, default : 'https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png'},
        role : {type : String, default : 'user'}                               
    }
)
module.exports=mongoose.model('ListUser',userSchema)