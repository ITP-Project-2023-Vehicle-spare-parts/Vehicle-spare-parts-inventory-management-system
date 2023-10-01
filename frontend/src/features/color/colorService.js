import axios from 'axios';
import {base_url} from "../../utils/axiosconfig";

const getColors = async () =>{
    const response = await axios.get(`${base_url}color/getAllColor`);
    return response.data;
}

const createColor = async (Color) =>{
    const response = await axios.post("http://localhost:8000/color/addColor/", Color);
    return response.data;
}

const deleteColor = async (id) =>{
    const response = await axios.delete(`${base_url}color/deletColor/${id}`);
    return response.data;
}
const colorService = {
    getColors,
    createColor,
    deleteColor
}

export default colorService;