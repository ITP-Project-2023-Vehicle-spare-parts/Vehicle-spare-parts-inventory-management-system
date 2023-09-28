import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from './colorService';
import { toast } from "react-toastify";

export const getColors = createAsyncThunk(
    "color/get-colors",
    async(thunkAPI) => {
        try{
            return await colorService.getColors();
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState ={
    colors: [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : "",
};

export const colorSlice = createSlice ({
    name: "colors",
    initialState,
    reducers : {},

    extraReducers : (builder) => {
        builder.addCase(getColors.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getColors.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
            if (state.isSuccess === true) {
                toast.success("Brands Loaded Successfully");
            }
        })
        .addCase(getColors.rejected, (state, action) => {
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

export default colorSlice.reducer;