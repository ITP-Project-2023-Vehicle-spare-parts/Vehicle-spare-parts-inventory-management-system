import axios from 'axios';
import { base_url } from "../../utils/base_url";

const getProducts = async () =>{
    const response = await axios.get(`${base_url}product/`);
    return response.data;
}

const getSingleProduct = async (id) =>{
    const response = await axios.get(`${base_url}product/${id}`);
    return response.data;
}

const createProduct = async (product) =>{
    const response = await axios.post("http://localhost:8000/product/", product);
    return response.data;
}

const addToWishlist = async (ProductID) =>{
    const response = await axios.put("http://localhost:8000/product/wishlist", {ProductID});
    return response.data;
}

const deleteProduct = async (id) =>{
    const response = await axios.delete(`${base_url}product/${id}`);
    return response.data;
}

const productService = {
    getProducts,
    createProduct,
    addToWishlist,
    getSingleProduct,
    deleteProduct,
}

export default productService;