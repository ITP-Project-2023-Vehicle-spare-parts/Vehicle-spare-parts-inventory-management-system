import axios from 'axios';
import {base_url} from "../../utils/axiosconfig";

const getBrands = async () =>{
    const response = await axios.get(`${base_url}brand/`);
    return response.data;
}

const createBrand = async (Brand) =>{
    const response = await axios.post("http://localhost:8000/brand/addBrand/", Brand);
    return response.data;
}

const deleteBrand = async (id) =>{
    const response = await axios.delete(`${base_url}brand/deletBrand/${id}`);
    return response.data;
}

const brandService = {
    getBrands,
    createBrand,
    deleteBrand,
}

export default brandService;