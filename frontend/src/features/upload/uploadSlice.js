import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";
import { toast } from "react-toastify";

export const uploadImg = createAsyncThunk(
    "upload/images",
    async(data, thunkAPI) => {
        try{
            const formData = new FormData();
            for(let i = 0; i < data.length; i++){
                formData.append("images", data[i])
            }
            return await uploadService.uploadImg(formData);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const delImg = createAsyncThunk(
    "delete/images",
    async(id, thunkAPI) => {
        try{
            return await uploadService.deleteImg(id);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState ={
    images: [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : "",
};

export const uploadSlice = createSlice ({
    name: "images",
    initialState,
    reducers : {},

    extraReducers : (builder) => {
        builder.addCase(uploadImg.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(uploadImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = action.payload;
            if (state.isSuccess === true) {
                toast.success("Image uploaded Successfully");
            }
        })
        .addCase(uploadImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.error("Something Went in ing Wrong !!!"); 
            }
        })
        .addCase(delImg.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(delImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = [];
            if (state.isSuccess === true) {
                toast.success("Image deleted Successfully");
            }
        })
        .addCase(delImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
            if (state.isError === true) {
                toast.error("Something Went in ing Wrong !!!"); 
            }
        });
    },
});

export default uploadSlice.reducer;