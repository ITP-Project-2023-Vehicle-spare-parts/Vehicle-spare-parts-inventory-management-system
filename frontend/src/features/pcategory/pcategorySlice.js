import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";
import { toast } from "react-toastify";

export const getCategories = createAsyncThunk(
    "productCategory/get-categories",
    async(thunkAPI) => {
        try{
            return await pcategoryService.getProductCategories();
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState ={
    pCategories: [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : "",
};

export const pCategorySlice = createSlice ({
    name: "pCategories",
    initialState,
    reducers : {},

    extraReducers : (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pCategories = action.payload;
            if (state.isSuccess === true) {
                toast.success("Products Loaded Successfully");
            }
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.error("Something Went Wrong !!!"); 
            }
        });
    },
});

export default pCategorySlice.reducer;