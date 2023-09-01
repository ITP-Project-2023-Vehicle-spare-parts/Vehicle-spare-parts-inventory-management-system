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
        //filtering products
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const parsedQuery = JSON.parse(queryStr);
        let query = Product.find(parsedQuery);

        //sorting products
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }else{
            query = query.sort("-createdAt");
        }

        //limiting product fields
        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }else{
            query = query.select("-__v");
        }

        //pagination in products
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip >= productCount){
                throw new Error("The page does not exits...");
            }
        }
        console.log(page,limit,skip);

        const product = await query;
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error retrieving all Products", error: err.message });
    }
};


module.exports = { 
    addProduct, 
    getaProduct, 
    getAllProduct, 
    editProduct, 
    removeProduct }