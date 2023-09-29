import axios from 'axios';
import {base_url} from "../../utils/axiosconfig";

const getProductCategories = async () =>{
    const response = await axios.get(`${base_url}category/getAllCategoryProduct`);
    return response.data;
}

const createCategory = async (Category) =>{
    const response = await axios.post("http://localhost:8000/category/addCategory/", Category);
    return response.data;
}

const pcategoryService = {
    getProductCategories,
    createCategory,
}

export default pcategoryService;