import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
    "product/get-products",
    async(thunkAPI) => {
        try{
            return await productService.getProducts();
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState ={
    products: [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : "",
};

export const productSlice = createSlice ({
    name: "products",
    initialState,
    reducers : {},

    extraReducers : (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.products = action.payload;
            if (state.isSuccess === true) {
                toast.success("Products Loaded Successfully");
            }
        })
        .addCase(getProducts.rejected, (state, action) => {
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

export default productSlice.reducer;