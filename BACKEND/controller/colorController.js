const Color = require("../model/colorModel");
const validateMongoDbId = require("../utills/validateMongoDbId")
const asyncHandler = require("express-async-handler");

const createColor = asyncHandler(async (req, res)=>{
    try{
        const newColor =  await Color.create(req.body);
        res.json(newColor);
    }catch(error){
        throw new Error(error);
    }
});

const updateColor = asyncHandler(async (req, res)=>{
    const id = req.params.id;
    validateMongoDbId(id);
    try{
        const updatedColor =  await Color.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.json(updatedColor);
    }catch(error){
        throw new Error(error);
    }
});

const deleteColor = asyncHandler(async (req, res)=>{
    const id = req.params.id;
    validateMongoDbId(id);
    try{
        const deletedColor=  await Color.findByIdAndDelete(id);
        res.json(deletedColor);
    }catch(error){
        throw new Error(error);
    }
});

const getAColor= asyncHandler(async (req, res)=>{
    const id = req.params.id;
    validateMongoDbId(id);
    try{
        const getColor =  await Color.findById(id);
        res.json(getColor);
    }catch(error){
        throw new Error(error);
    }
});

const getAllColor = asyncHandler(async (req, res)=>{
    try{
        const getallColor =  await Color.find();
        res.json(getallColor);
    }catch(error){
        throw new Error(error);
    }
});


module.exports = {createColor, updateColor, deleteColor, getAColor, getAllColor};