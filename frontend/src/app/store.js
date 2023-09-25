import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";


export const store = configureStore ({
    reducer:{
        auth : authReducer,
        enquiry : enquiryReducer,
    },
});