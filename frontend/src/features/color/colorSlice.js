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

export const createColor = createAsyncThunk(
    "color/create-color",
    async (colorData, thunkAPI) => {
      try {
        return await colorService.createColor(colorData);
      } catch (error) {
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
                toast.success("Colors Loaded Successfully");
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
        })
        .addCase(createColor.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdColor = action.payload;
        })
        .addCase(createColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});

export default colorSlice.reducer;