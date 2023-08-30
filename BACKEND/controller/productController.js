const Product = require('../model/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const addProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.Title){
            req.body.slug = slugify(req.body.Title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
});

const editProduct = asyncHandler(async(req, res)=>{
    const {id} = req.params.id;
    try {
        if (req.body.Title){
            req.body.slug = slugify(req.body.Title);
        }
        const editProduct = await Product.findOneAndUpdate({id}, req.body, {
            new: true,
        });
        res.json(editProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const removeProduct = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getaProduct = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const getallProduct = await Product.find();
        res.json(getallProduct);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { 
    addProduct, 
    getaProduct, 
    getAllProduct, 
    editProduct, 
    removeProduct }