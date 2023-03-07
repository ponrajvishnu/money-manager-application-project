var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {dbUrl} = require('../config/dbConfig')
const {MoneyManageModel} = require('../schema/moneyManageSchema')
const {hashCompare,hashPassword,createToken,decodeToken,validate,roleAdmin} = require('../config/auth')
mongoose.set('strictQuery',true)

mongoose.connect(dbUrl)

router.post('/add-manage',validate, async(req,res) => {
  try {
    let category = new MoneyManageModel(req.body)
    await category.save()

    res.status(201).send({
      message: 'Category created successfully',
    })
  } catch(err) {
    console.log(err)
    res.status(500).send({
      message: "Internal server error",
      err
    })
  }
})

router.get('',validate, async(req,res) => {
  try {
    let manages = await MoneyManageModel.find()
    res.status(200).send({
      manages
    })
  } catch(err) {
    res.status(500).send({
      message: "Internal server error",
      err
    })
  }
})

router.get('/dashboard',validate,roleAdmin, async(req,res) => {
  try {
    let data = await MoneyManageModel.aggregate([{
      $group:{_id: "$type", count:{$sum:1}}
    }])
    
    res.status(200).send({
      MoneyManages: data
    })
  } catch(err) {
    res.status(500).send({
      message: "Internal server error",
      err
    })
  }
})

router.get('/dashboard-list-items/:type',validate,roleAdmin, async(req,res) => {
  try {
    let manages = await MoneyManageModel.find({type: req.params.type})
    res.status(200).send({
      manages
    })
  } catch(err) {
    res.status(500).send({
      message: "Internal server error",
      err
    })
  }
})

router.get('/dashboard-edit/:id',validate,roleAdmin, async(req,res) => {
  try {
    let manages = await MoneyManageModel.findOne({_id: req.params.id})
    res.status(200).send({
      manages
    })
  } catch(err) {
    res.status(500).send({
      message: "Internal server error",
      err
    })
  }
});

router.put('/update-income-expense/:id',validate,roleAdmin, async(req,res) => {
  try {
    const HOUR = 12000 * 60 * 60;
    const datediff = Date.now() - HOUR;
    let data = await MoneyManageModel.findOne({_id: req.params.id})
    
    if(Date.parse(data.createdAt) > datediff){
      let data = await MoneyManageModel.updateOne({_id: req.params.id}, {$set: req.body})

      res.status(200).send({
        message: "Updated Successfully!"
      })
    }else {
      res.status(500).send({
        message: "Can't be edited, Application is created is more than 12 hours",
      })
    }
    
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
      err
    })
  }
})

module.exports = router;
