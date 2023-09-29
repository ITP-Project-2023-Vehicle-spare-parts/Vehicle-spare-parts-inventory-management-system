import axios from 'axios';
import { base_url } from "../../utils/base_url";

const getProducts = async () =>{
    const response = await axios.get(`${base_url}product/`);
    return response.data;
}

const createProduct = async (product) =>{
    const response = await axios.post("http://localhost:8000/product/", product);
    return response.data;
}

const productService = {
    getProducts,
    createProduct
}

export default productService;