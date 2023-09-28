import axios from 'axios';
import {base_url} from "../../utils/axiosconfig";

const getColors = async () =>{
    const response = await axios.get(`${base_url}color/getAllColor`);
    return response.data;
}

const colorService = {
    getColors,
}

export default colorService;