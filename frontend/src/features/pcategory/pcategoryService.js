import axios from 'axios';
import {base_url} from "../../utils/axiosconfig";

const getProductCategories = async () =>{
    const response = await axios.get(`${base_url}category/getAllCategoryProduct`);
    return response.data;
}

const pcategoryService = {
    getProductCategories
}

export default pcategoryService;