import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

const getUserfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
    user: getUserfromLocalStorage,
    orders: [],
    filteredOrders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const login = createAsyncThunk(
    'auth/admin-login', 
    async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getMonthlyData = createAsyncThunk(
    'orders/monthlydata',
    async (data, thunkAPI) => {
      try {
        const response = await authService.getMonthlyOrders(data);
        console.log('Monthly Data Response:', response); 
        return response;
      } catch (error) {
        console.error('Error fetching monthly data:', error); 
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  

export const getYearlyData = createAsyncThunk(
    'orders/yearlydata',
    async (data, thunkAPI) => {
      try {
        return await authService.getYearlyStats(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
); 

export const getOrders = createAsyncThunk(
    'order/getallorders', 
    async (data, thunkAPI) => {
    try {
        return await authService.getOrders(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrder = createAsyncThunk(
    'order/get-order', 
    async (id, thunkAPI) => {
      try {
        return await authService.getOrder(id);
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message }); 
      }
    }
);

export const updateAOrder = createAsyncThunk(
    'order/update-order', 
    async (data, thunkAPI) => {
      try {
        return await authService.updateOrder(data);
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message }); 
      }
    }
);

export const searchOrders = (searchText) => (dispatch, getState) => {
    const orderState = getState().auth.orders.orders;
  
    if (orderState) {
      const filtered = orderState.filter((order) => {
        const lowerSearchText = searchText.toLowerCase();
        const nameMatch =
          order.user.firstname.toLowerCase().includes(lowerSearchText) ||
          order.user.lastname.toLowerCase().includes(lowerSearchText);
        const amountMatch = order.totalPrice.toString().includes(lowerSearchText);
        const dateMatch = new Date(order.createdAt).toLocaleString().includes(lowerSearchText);
        const actionMatch = order.orderStatus.toLowerCase().includes(lowerSearchText);
  
        return nameMatch || amountMatch || dateMatch || actionMatch;
      });
  
      dispatch(setFilteredOrders(filtered));
    }
  };
  
  
  
  




export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setFilteredOrders: (state, action) => {
            state.filteredOrders = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = action.payload;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleorder = action.payload;
                state.message = "success";
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getMonthlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                state.message = "success";
            })
            .addCase(getMonthlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getYearlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = "success";
            })
            .addCase(getYearlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateAOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = "success";
            })
            .addCase(updateAOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export const { setFilteredOrders } = authSlice.actions;

export default authSlice.reducer;
