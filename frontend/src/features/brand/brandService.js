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

const brandService = {
    getBrands,
    createBrand,
}

export default brandService;