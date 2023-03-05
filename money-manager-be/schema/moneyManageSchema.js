const mongoose = require('mongoose')
const validator = require('validator')

const MoneyManageSchema = new mongoose.Schema({
    type: {type: String, required: true},
    datetime: {type: Date, required: true},
    division: {type: String, required: true},
    categories: {type: String, requird: true},
    description: {type: String},
    createdAt: {type:Date,default:Date.now()}
},{versionKey: false})

const MoneyManageModel = mongoose.model('money_manage_details', MoneyManageSchema)
module.exports = {MoneyManageModel}