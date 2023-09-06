const Category = require("../model/productCategoryModel");
const validateMongoDbId = require("../utills/validateMongoDbId")
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res)=>{
    try{
        const newCategory =  await Category.create(req.body);
        res.json(newCategory);
    }catch(error){
        throw new Error(error);
    }
});

module.exports = {createCategory};