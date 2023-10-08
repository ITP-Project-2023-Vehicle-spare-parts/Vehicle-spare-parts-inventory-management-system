import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "./userService";
import {toast} from "react-toastify";
import {getUserFromLocalStorage} from "../../utils/axiosconfig";

export const resetState = createAction("Reset_all")

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await userService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await userService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const addProToCart = createAsyncThunk(
    "user/cart/add",
    async (cartData, thunkAPI) => {
        try {
            return await userService.addToCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const createAnOrder = createAsyncThunk(
    "user/cart/create-order",
    async (orderDetail, thunkAPI) => {
        try {
            return await userService.createOrder(orderDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });


export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async (thunkAPI) => {
        try {
            return await userService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getOrders = createAsyncThunk(
    "user/order/get",
    async (thunkAPI) => {
        try {
            return await userService.getUserOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async (data, thunkAPI) => {
        try {
            return await userService.removeProductFromCart(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async (cartDetail, thunkAPI) => {
        try {
            return await userService.updateProductInCart(cartDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteUserCart = createAsyncThunk(
    "user/cart/delete",
    async (data, thunkAPI) => {
        try {
            return await userService.emptyCart(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess) {
                    toast.success("User created successfully");
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error(action.error);
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                console.log(action.payload)
                if (state.isSuccess === true) {
                    localStorage.setItem('user', JSON.stringify(action.payload));
                    toast.success("User Login successfully");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(addProToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userCart = action.payload;
                if (state.isSuccess) {
                    toast.success("Product added to cart");
                }
            })
            .addCase(addProToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userCart = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userCart = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Deleted From Cart Successfully");
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something Went Wrong !!");
                }
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userCart = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Qty Updated Successfully");
                }
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something Went Wrong !!");
                }
            })
            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdOrder = action.payload;
                if (state.isSuccess) {
                    toast.success("Order Created Successfully");
                }
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something Went Wrong !!");
                }
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getorderedProduct = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
            })
            .addCase(deleteUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default userSlice.reducer;
