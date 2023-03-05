var express = require('express');
var router = express.Router();
const {dbUrl} = require('../config/dbConfig')
const mongoose = require('mongoose')
const {UserModel} = require('../schema/usersSchema')
const {hashCompare,hashPassword,createToken,decodeToken,validate,roleAdmin} = require('../config/auth')
mongoose.set('strictQuery',true)

mongoose.connect(dbUrl)


router.post('/login',async(req,res)=>{
  try {
    let user = await UserModel.findOne({email:req.body.email})
   if(user)
   {
      console.log(await hashCompare(req.body.password,user.password))
      if(await hashCompare(req.body.password,user.password))
      {
        let token = await createToken({email:user.email,firstName:user.firstName,lastName:user.lastName,role:user.role})
        res.status(200).send({message:"Login Successfull",token,role:user.role})
      }
      else
        res.status(400).send({message:"Invalid Credentials"})
   }
   else
    res.status(400).send({message:"Email does not exists"})
  } catch (error) {console.log(error)
    res.status(500).send({message:"Internal Server Error",error})
  }
})

router.post('/signup',async(req,res)=>{
  try {
    let user = await UserModel.findOne({email:req.body.email})
    if(!user)
    {
        req.body.password = await hashPassword(req.body.password)
        let doc = new UserModel(req.body)
      await doc.save()
      res.status(201).send({
        message:"User created successfully"
    })
    }
    else
    {
      res.status(400).send({message:"Email Id already exists"})
    }
  } catch (error) {console.log(error)
    res.status(500).send({message:"Internal Server Error",error})
  }
})

module.exports = router;