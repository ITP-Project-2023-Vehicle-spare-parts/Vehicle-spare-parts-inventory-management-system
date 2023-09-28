import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

// Import your components here
import AddSupplier from "./components/Supplier/AdminSupplierPage/AddSupplier";
import AddClient from "./components/Client/AddClient";
import SupplierProfile from "./components/Supplier/AdminSupplierPage/SupplierProfile";
import Login from "./components/Customers/Login";
import AllSupplier from "./components/Supplier/AdminSupplierPage/AllSupplier";
import AllClient from "./components/Client/AllClients";
import FetchStock from "./components/stockComponents/fetchStock";
import UpdateProfileAdmin from "./components/Supplier/AdminSupplierPage/UpdateProfileAdmin";
import SupplierHome from "./components/Supplier/UserSupplierPage/SupplierHome";
import SupplierAnalyse from "./components/Supplier/UserSupplierPage/SupplierAnalyse";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import Orders from "./pages/Orders";
import Enquiries from "./pages/Enquiries";
import UserSupplierProfile from "./components/Supplier/UserSupplierPage/UsersupplierProfile";

import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";

import CategoryPieChart from "./components/stockComponents/pieChart";
import CategoryBarGraph from "./components/stockComponents/barGraph";
import LowStock from "./components/stockComponents/lowStock";
import UpdateStock from "./components/stockComponents/updateStock";

import AddClaim from "./components/ClaimComponents/AddClaim";
import FetchClaim from "./components/ClaimComponents/FetchClaim";
import UpdateClaim from "./components/ClaimComponents/UpdateClaim";
import DeleteClaim from "./components/ClaimComponents/DeleteClaim";
import AllClaims from "./components/AdminClaimComponent/AllClaims";
import AdminUpdateclaim from "./components/AdminClaimComponent/AdminUpdateclaim";

import ClientProfile from "./components/Client/ClientProfile";
import ClientProfileUpdate from "./components/Client/ClientProfileUpdate";

import DeliveryForm from "./components/DeliveryPersons/DeliveryForm";
import DeliveryTable from "./components/DeliveryPersons/DeliveryTable";
import ProfileDetails from "./components/DeliveryPersons/ProfileDetails";
import EditDeliveryPerson from "./components/DeliveryPersons/EditDeliveryPerson";
import OrderList from "./components/OrderList";
import AvailableDeliveryPersonList from "./components/AvailableDeliveryPersonList";

import Home from "./pages/Home";
import Store from "./pages/store";
import Wishlist from "./pages/Wishlist";
import SingleProduct from "./pages/SingleProduct";

import Sidebar from "./components/Sidebar";

import UserRegistration from "./components/Customers/UserRegistration";
import Forgotpassword from "./components/Customers/Forgotpassword";
import Resetpassword from "./components/Customers/Resetpassword";

import InteractiveChartsPage from "./components/stockComponents/interactiveChart";
import LowStockBarGraph from "./components/stockComponents/lowStockGraph";
import AddStock from "./components/stockComponents/addStock";

import UserSupplierUpdateProfile from "./components/Supplier/UserSupplierPage/UserSupplierUpdateProfile";

import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addcolor from "./pages/Addcolor";
import Addcategory from "./pages/Addcategory";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Toaster
            position="top-center"
            toastOptions={{ duration: 3000 }}
          ></Toaster>
          <ToastContainer position="top-right" autoClose={3000} />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/reset-password" element={<Resetpassword />} />

            {/* Admin Routes */}
            <Route path="/Admin/sup/add" element={<AddSupplier />} />
            <Route path="/Admin/sup/All" element={<AllSupplier />} />
            <Route path="/Admin/stock" element={<FetchStock />} />
            <Route path="/Admin/client/add" element={<AddClient />} />
            <Route
              path="/Admin/Supplier/Profile"
              element={<SupplierProfile />}
            />
            <Route path="/Admin/client/All" element={<AllClient />} />
            <Route
              path="/Admin/profile/update/:id"
              element={<UpdateProfileAdmin />}
            />
            <Route
              path="/Admin/Sup/Profile/:id"
              element={<SupplierProfile />}
            />
            <Route
              path="/Admin/client/Profile/:id"
              element={<ClientProfile />}
            />
            <Route
              path="/Admin/client/profile/update/:id"
              element={<ClientProfileUpdate />}
            />

            <Route path="/admin/piechart" element={<CategoryPieChart />} />

            <Route path="/admin/bargraph" element={<CategoryBarGraph />} />
            <Route path="/admin/lowstock" element={<LowStock />} />
            <Route path="/admin/updatestock" element={<UpdateStock />} />

            <Route path="/admin/bargraph" element={<CategoryBarGraph />} />
            <Route path="/admin/lowstock" element={<LowStock />} />
            <Route path="/admin/updatestock/:id" element={<UpdateStock />} />

            <Route path="/" element={<AllClaims />} />
            <Route
              path="admin/updates/:id/:billno"
              element={<AdminUpdateclaim />}
            />

            <Route
              path="/Admin/DeliveryPerson/add"
              element={<DeliveryForm />}
            />
            <Route
              path="/Admin/DeliveryPerson/getAll"
              exact
              element={<DeliveryTable />}
            />
            <Route
              path="/Admin/profile/:deliveryPersonID"
              element={<ProfileDetails />}
            />
            <Route
              path="/Admin/dilivary/profiles/:id"
              element={<EditDeliveryPerson />}
            />
            <Route
              path="/Admin/profile/update/:id"
              element={<EditDeliveryPerson />}
            />
            <Route path="/admin/orders" exact element={<OrderList />} />
            <Route
              path="/order/:orderid/:userid"
              element={<AvailableDeliveryPersonList />}
            />

            <Route
              path="/admin/interactivechart"
              element={<InteractiveChartsPage />}
            />
            <Route path="/admin/lowstockGraph" element={<LowStockBarGraph/>}/>
            <Route path="/admin/addstock" element={<AddStock/>}/>

            {/* Claim Part */}
            <Route path="/addclaim" element={<AddClaim />} />
            <Route path="/get/:billno" element={<FetchClaim />} />
            <Route path="/update/:id/:billno" element={<UpdateClaim />} />
            <Route path="/delete/:id/:billno" element={<DeleteClaim />} />

            {/* Supplier Routes */}
            <Route path="/supplier/home" element={<SupplierHome />} />
            <Route path="/supplier/analyse" element={<SupplierAnalyse />} />
            <Route path="/supplier/profile" element={<UserSupplierProfile />} />
            <Route path="/supplier/profile/update" element={<UserSupplierUpdateProfile />} />

            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='inquiry' element={<Enquiries />} />
              <Route path='enquiries/:id' element={<ViewEnq />} />
              <Route path='order' element={<Orders />} />
              <Route path='order/:id' element={<ViewOrder />} />
              <Route path='color-list' element={<Colorlist />} />
              <Route path="category-list" element={<Categorylist />} />
              <Route path="brand-list" element={<Brandlist />} />
              <Route path="product-list" element={<Productlist />} />
              <Route path="Add-color" element={<Addcolor />} />
              <Route path="Add-category" element={<Addcategory /> }/>
              <Route path="Add-brand" element={<Addbrand />} />
              <Route path="Add-product" element={<Addproduct />} />
            </Route>

            <Route path="/home" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} />
              <Route path="my-orders" element={<Order />} />
              <Route path="Checkout" element={<Checkout />} />
              <Route path="/home/store" element={<Store />} />
              <Route path="store/product/:id" element={<SingleProduct />} />
              <Route path="/home/wishlist" element={<Wishlist />} />
            </Route>

            <Route path="/sidebar" element={<Sidebar />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
