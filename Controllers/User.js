const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User =require('../Models/User');

exports.SignUp=async(req,res)=>{
    try {
        const {email,password}=req.body
        const found =await User.findOne({email})
        if(found){
          return res.status(400).send({errors:[{msg:"email already exist"}]})
        }
        const account= new User(req.body)
        
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        account.password=hashedPassword
        account.save()
        const payload ={ id: account._id }
        var token = jwt.sign(payload, process.env.privateKey)
        res.status(200).send({msg : "Account created", account, token})
        
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not create account"}]})
    }
}

exports.SignIn=async(req,res)=>{
    try {
        const {email,password}=req.body
        const found =await User.findOne({email})
        if(!found){
            return res.status(400).send({errors:[{msg:"wrong email"}]})
        }
        const matched =bcrypt.compareSync(password, found.password);
        if (!matched) {
             return res.status(400).send({errors:[{msg:"wrong password"}]})
        }
        const payload ={ id: found._id }
        var token = jwt.sign(payload, process.env.privateKey)
        res.status(200).send({msg : "Connected",token,found})
 
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not log in"}]})
    }
}
exports.UpdateProfil=async(req,res)=>{
       try {
        const {id}= req.params
        await User.findByIdAndUpdate(id,{$set:req.body})
        res.status(200).send({msg:"Prodil updated"})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not update the profil"}]})
    }
}

exports.DeleteProfil=async(req,res)=>{
       try {
        const {id}= req.params
        await User.findByIdAndDelete(id)
        res.status(200).send({msg:"Prodil is deleted"})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not delete the profil"}]})
    }
}

exports.getAllUsers=async(req,res)=>{
       try {
         const users= await User.find()
        res.status(200).send({msg:"List of Users",users})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not get the list of Users"}]})
    }
}

exports.DeleteUser=async(req,res)=>{
       try {
        const {id}= req.params
        await User.findByIdAndDelete(id)
        res.status(200).send({msg:"User is deleted"})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not delete the user"}]})
    }
}