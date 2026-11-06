const Rate = require("../Models/Rate")

exports.addRate=async(req,res)=>{
    try {
        const {rate , movieId}=req.body
        const existingRate = await Rate.findOne({owner : req.user._id, movieId})
        if (existingRate) {
          await existingRate.save()

         return res.status(200).send({msg: "Rate updated",existingRate})
        }
        
        const addedrate= new Rate({rate,movieId, owner : req.user._id})
        await addedrate.save()
        res.status(200).send({msg:"rating added", addedrate})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not add the rating"}]})
    }
}

exports.getAllRates=async(req,res)=>{
    try {
        const rates= await Rate.find().populate('owner').populate('movieId')

        res.status(200).send({msg:"List of the rates", rates})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not get the list of the rates"}]})
    }
}

exports.getOneRate=async(req,res)=>{
    try {
        const {id}=req.params
        const RateFound= await Rate.findById(id).populate('owner').populate('movieId')
   
        res.status(200).send({msg:"rate founded", RateFound})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not find the rate"}]})
    }
}

exports.deleteRate=async(req,res)=>{
    try {
        const {id}=req.params
        await Rate.findByIdAndDelete(id)
   
        res.status(200).send({msg:"Rate deleted"})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not delete the rate"}]})
    }
}

exports.updateRate=async(req,res)=>{
    try {
        const {id}=req.params
      
        const updated = await Rate.findByIdAndUpdate(id,{$set: req.body})
   
        res.status(200).send({msg:"Rate updated", updated})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not update the rate"}]})
    }
}

exports.getRatesByMovie=async(req,res)=>{
    try {
        const {id}=req.params
        const RatesFound= await Rate.find({ movieId: id}).populate('owner').populate('movieId')

        res.status(200).send({msg:"List of the rates of the movie ", RatesFound})
    } catch (error) {
        res.status(500).send({errors:[{msg:"could not get the list of the rates of the movie"}]})
    }
}