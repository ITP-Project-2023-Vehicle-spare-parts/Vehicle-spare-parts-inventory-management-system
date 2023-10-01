import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from './brandService'
import { toast } from "react-toastify";

export const getBrands = createAsyncThunk(
    "brand/get-brands",
    async(thunkAPI) => {
        try{
            return await brandService.getBrands();
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createBrand = createAsyncThunk(
    "brand/create-brand",
    async (brandData, thunkAPI) => {
      try {
        return await brandService.createBrand(brandData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const deleteBrand = createAsyncThunk(
    "brand/delete-brands",
    async(id, thunkAPI) => {
        try{
            return await brandService.deleteBrand(id);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

  export const resetState = createAction("Reset_all");

const initialState ={
    brands: [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : "",
};

export const brandSlice = createSlice ({
    name: "brands",
    initialState,
    reducers : {},

    extraReducers : (builder) => {
        builder
        .addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brands = action.payload;
            if (state.isSuccess === true) {
                toast.success("Brands Loaded Successfully");
            }
        })
        .addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.error("Something Went Wrong !!!"); 
            }
        })
        .addCase(createBrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBrand = action.payload;
        })
        .addCase(createBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteBrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBrand = action.payload;
        })
        .addCase(deleteBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default brandSlice.reducer;