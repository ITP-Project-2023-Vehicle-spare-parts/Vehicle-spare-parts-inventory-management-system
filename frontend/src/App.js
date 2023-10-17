import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import 'semantic-ui-css/semantic.min.css';

// Import your components here
import AddSupplier from "./components/Supplier/AdminSupplierPage/AddSupplier";
import AddClient from "./components/Client/AddClient";
import SupplierProfile from "./components/Supplier/AdminSupplierPage/SupplierProfile";
import Login from "./components/Customers/Login";
import AllSupplier from "./components/Supplier/AdminSupplierPage/AllSupplier";
import AllClient from "./components/Client/AllClients";
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

import InteractiveChartsPage from "./pages/interactiveChart";
import AddStock from "./pages/addStock";
import LowStockBarGraph from "./components/stockComponents/lowStockGraph";
import LowStock from "./pages/lowStock";
import FetchStock from "./pages/fetchStock";

import AddClaim from "./pages/AddClaim";
import FetchClaim from "./pages/FetchClaim";
import UpdateClaim from "./pages/UpdateClaim";
import DeleteClaim from "./pages/DeleteClaim";
import AllClaims from "./pages/AllClaims";
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
import UserProfile from "./components/Customers/UserProfile";
import CustomerProfileUpdate from "./components/Customers/CustomerProfileUpdate";

import UserSupplierUpdateProfile from "./components/Supplier/UserSupplierPage/UserSupplierUpdateProfile";
import ShipmentReport from "./components/Supplier/UserSupplierPage/ShipmentReport";

import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addcolor from "./pages/Addcolor";
import Addcategory from "./pages/Addcategory";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";

import AddBranch from "./components/Branch/AddBranch";
import AddOffer from "./components/Offers/AddOffer";
import AddCoupon from "./components/Coupon/AddCoupon";
import BranchTable from "./components/Branch/BranchTable";
import BranchDetails from "./components/Branch/BranchDetails";
import OfferTable from "./components/Offers/OfferTable";
import OfferDetails from "./components/Offers/OfferDetails";
import CouponTable from "./components/Coupon/CouponTable";
import CouponDetails from "./components/Coupon/CouponDetails";
import EditBranch from "./components/Branch/EditBranch";
import EditCoupon from "./components/Coupon/EditCoupon";
import EditOffer from "./components/Offers/EditOffer";
import AssignBranch from "./components/AssignBranch";

import ComparisionBarGraph from "./components/stockComponents/comparisiongraph";

import TrackOrder from "./components/TrackOrder";
import TrackOrderDetails from "./components/TrackOrderDetails";
import OrderHistoryTable from "./components/OrderHistryTable";

import StockReport from "./pages/stockReport";
import Updatepduct from "./pages/Updateproduct";
import AdminCustomerList from "./components/Customers/AdminCustomerList";

import UpdateStock from "./pages/updateStock";
import UpdateShipmentReport from "./components/Supplier/UserSupplierPage/UpdateShipmentReport";
import DeliveryPersonSideBar from "./components/deliveryPersonSideBar";
import DeliveryPersonPrivate from "./components/deliveyPersonprivate";
import ViewBranchOrder from "./components/Branch/ViewBranchOrder";
import BillAssign from "./components/Branch/BillAssign";
import BranchSales from "./components/Branch/BranchSales";
import CustomerDetails from "./components/Customers/CustomerDetails";
import DeliveryChart from "./components/DeliveryChart";
import DeliveryDashboard from "./components/DeliveryDashboard";
import DeliveryPersonCurrentOrder from "./components/DeliveryPersonCurrentOrder";
import DeliveredOrderHistory from "./components/DeliveredOrderHistory";



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

            <Route path="/Admin/sup/All" element={<AllSupplier />} />

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

            <Route path="/admin/bargraph" element={<CategoryBarGraph />} />

            <Route path="/" element={<AllClaims />} />
            <Route
              path="admin/updates/:id/:billno"
              element={<AdminUpdateclaim />}
            />

            <Route
              path="/admin/interactivechart"
              element={<InteractiveChartsPage />}
            />
            <Route path="/admin/lowstockGraph" element={<LowStockBarGraph />} />

            <Route
              path="/admin/comparisiongraph"
              element={<ComparisionBarGraph />}
            />

            {/* Claim Part */}
            <Route path="/addclaim" element={<AddClaim />} />
            <Route path="/get/:billno" element={<FetchClaim />} />
            <Route path="/update/:id/:billno" element={<UpdateClaim />} />
            <Route path="/delete/:id/:billno" element={<DeleteClaim />} />

            {/* Supplier Routes */}
            <Route path="/supplier/home" element={<SupplierHome />} />
            <Route path="/supplier/analyse" element={<SupplierAnalyse />} />
            <Route path="/supplier/profile" element={<UserSupplierProfile />} />
            <Route
              path="/supplier/profile/update"
              element={<UserSupplierUpdateProfile />}
            />
            <Route path="/supplier/order" element={<ShipmentReport />} />
            <Route
              path="/supplier/update/order"
              element={<UpdateShipmentReport />}
            />
         


            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="inquiry" element={<Enquiries />} />
              <Route path="enquiries/:id" element={<ViewEnq />} />
              <Route path="order" element={<Orders />} />
              <Route path="order/:id" element={<ViewOrder />} />
              <Route path="color-list" element={<Colorlist />} />
              <Route path="category-list" element={<Categorylist />} />
              <Route path="brand-list" element={<Brandlist />} />
              <Route path="product-list" element={<Productlist />} />
              <Route path="Add-color" element={<Addcolor />} />
              <Route path="Add-category" element={<Addcategory />} />
              <Route path="Add-brand" element={<Addbrand />} />
              <Route path="Add-product" element={<Addproduct />} />
              <Route path="UpdateProduct/:id" element={<Updatepduct />} />
              <Route path="Add-stock" element={<AddStock />} />
              <Route path="Fetch-stock" element={<FetchStock />} />
              <Route path="Stock-Report" element={<StockReport />} />
              <Route path="DeliveryPerson-add" element={<DeliveryForm />} />
              <Route path="DeliveryChart" element={<DeliveryChart />} />
              <Route
                path="DeliveryPerson/getAll"
                exact
                element={<DeliveryTable />}
              />
              <Route
                path="profile/:deliveryPersonID"
                element={<ProfileDetails />}
              />
              <Route
                path="delivery/profiles/:id"
                element={<EditDeliveryPerson />}
              />
              <Route path="orders" exact element={<OrderList />} />
              <Route
                path="order/:orderid/:userid"
                element={<AvailableDeliveryPersonList />}
              />
              <Route path="orderHistory" element={<OrderHistoryTable />} />
              <Route path="branch/add" element={<AddBranch />} />
              <Route path="offer/add" element={<AddOffer />} />
              <Route path="coupon/add" element={<AddCoupon />} />
              <Route path="branch/read" exact element={<BranchTable />} />
              <Route path="branch/profile/:id" element={<BranchDetails />} />
              <Route path="offer/read" element={<OfferTable />} />
              <Route path="offer/profile/:offerID" element={<OfferDetails />} />
              <Route path="coupon/read" exact element={<CouponTable />} />

              <Route path="coupon/profiles/:id" element={<CouponDetails />} />
              <Route path="branch/update/:id" element={<EditBranch />} />
              <Route
                path="coupon/profile/update/:id"
                element={<EditCoupon />}
              />

              <Route path="coupon/profile" element={<CouponDetails />} />
              <Route
                path="branch/profile/update/:id"
                element={<EditBranch />}
              />
              <Route
                path="coupon/profiles/update/:id"
                element={<EditCoupon />}
              />

              <Route path="offer/profile/update/:id" element={<EditOffer />} />
              <Route path="assignBranch" element={<AssignBranch />} />
              <Route path="allclaim" element={<AllClaims />} />
              <Route path="user/customerlist" element={<AdminCustomerList />} />

              <Route
                path="Stock-interactivechart"
                element={<InteractiveChartsPage />}
              />
              <Route path="Stock-Low" element={<LowStock />} />

              <Route path="sup/add" element={<AddSupplier />} />
              <Route path="client/add" element={<AddClient />} />
              <Route path="updatestock/:id" element={<UpdateStock />} />

              <Route path="customer/:id" element={<CustomerDetails />} />
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
              <Route path="/home/addclaim" element={<AddClaim />} />
              <Route path="/home/get/:billno" element={<FetchClaim />} />
              <Route
                path="/home/update/:id/:billno"
                element={<UpdateClaim />}
              />
              <Route
                path="/home/delete/:id/:billno"
                element={<DeleteClaim />}
              />
            </Route>

            <Route path="/sidebar" element={<Sidebar />} />

            <Route path="/track-order" element={<TrackOrder />} />
            <Route
              path="/order-details/:orderId"
              element={<TrackOrderDetails />}
            />

            <Route path="user/profile" element={<Layout />}>
              <Route index element={<UserProfile />} />
              <Route path="update" element={<CustomerProfileUpdate />} />
            </Route>


            <Route
              path="/admin/viewBranchOrder"
              element={<ViewBranchOrder />}
            />
            <Route path="/admin/billAssign/:id" element={<BillAssign />} />
            <Route path="/admin/branchSales" element={<BranchSales />} />

            <Route path="/delivery" element={<DeliveryPersonSideBar />}>
               <Route index element={<DeliveryDashboard />} />
               <Route path="UserProfile" element = {<DeliveryPersonPrivate />} />
               <Route path="CurrentOrder" element = {<DeliveryPersonCurrentOrder />} />
               <Route path = "OrderHistory" element = {<DeliveredOrderHistory />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
