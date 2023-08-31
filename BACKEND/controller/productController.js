const Product = require('../model/productModel');
const slugify = require('slugify');

const addProduct = async (req, res) => {
    try {
        if (req.body.Title){
            req.body.slug = slugify(req.body.Title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding Products", error: err.message });
    }
};

const editProduct = async(req, res)=>{
    const id = req.params.id;
    try {
        if (req.body.Title){
            req.body.slug = slugify(req.body.Title);
        }
        const editProduct = await Product.findByIdAndUpdate(id, req.body);
        res.json(editProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating Products", error: err.message });
    }
};

const removeProduct = async(req, res)=>{
    const id = req.params.id;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error deleting Products", error: err.message });
    }
};

const getaProduct = async(req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error reterieving Product", error: err.message });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const getallProduct = await Product.find();
        res.json(getallProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error retreiving all Products", error: err.message });
    }
};


module.exports = { 
    addProduct, 
    getaProduct, 
    getAllProduct, 
    editProduct, 
    removeProduct }