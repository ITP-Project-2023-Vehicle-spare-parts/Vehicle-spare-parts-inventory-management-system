import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import contactReducer from "../features/contact/contactSlice";
import productReducer from "../features/product/productSlice";
import brandSliceReducer from "../features/brand/brandSlice";
import pCategorySliceReducer from "../features/pcategory/pcategorySlice";
import colorSliceReducer from "../features/color/colorSlice";

export const store = configureStore ({
    reducer:{
        auth : authReducer,
        enquiry : enquiryReducer,
        contact : contactReducer,
        product : productReducer,
        brand: brandSliceReducer,
        pcategory: pCategorySliceReducer,
        color: colorSliceReducer,
    },
});