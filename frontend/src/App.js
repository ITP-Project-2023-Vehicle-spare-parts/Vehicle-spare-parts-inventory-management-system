import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'; 
import { store } from './app/store';

// Import your components here
import AddSupplier from "./components/Supplier/AdminSupplierPage/AddSupplier";
import AddClient from "./components/Client/AddClient";
import SupplierProfile from "./components/Supplier/AdminSupplierPage/SupplierProfile";
import Login from "./components/Login";
import AllSupplier from "./components/Supplier/AdminSupplierPage/AllSupplier";
import AllClient from "./components/Client/AllClients";
import FetchStock from "./components/stockComponents/fetchStock";
import UpdateProfileAdmin from "./components/Supplier/AdminSupplierPage/UpdateProfileAdmin";
import SupplierHome from "./components/SupplierHome";
import SupplierAnalyse from "./components/Supplier/UserSupplierPage/SupplierAnalyse";
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import Orders from './pages/Orders';
import Enquiries from './pages/Enquiries';

import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";

import  CategoryPieChart from "./components/stockComponents/pieChart";
import CategoryBarGraph from "./components/stockComponents/barGraph";
import LowStock from "./components/stockComponents/lowStock";
import UpdateStock from "./components/stockComponents/updateStock";


import AddClaim from './components/ClaimComponents/AddClaim';
import FetchClaim from './components/ClaimComponents/FetchClaim';
import UpdateClaim from './components/ClaimComponents/UpdateClaim';
import DeleteClaim from './components/ClaimComponents/DeleteClaim';
import AllClaims from './components/AdminClaimComponent/AllClaims';
import AdminUpdateclaim from './components/AdminClaimComponent/AdminUpdateclaim';



import ClientProfile from "./components/Client/ClientProfile";
import ClientProfileUpdate from "./components/Client/ClientProfileUpdate";

import DeliveryForm from "./components/DeliveryPersons/DeliveryForm";
import DeliveryTable from "./components/DeliveryPersons/DeliveryTable";
import ProfileDetails from "./components/DeliveryPersons/ProfileDetails";
import EditDeliveryPerson from "./components/DeliveryPersons/EditDeliveryPerson";
import OrderList from "./components/OrderList";
import AvailableDeliveryPersonList from "./components/AvailableDeliveryPersonList";



import Sidebar from "./components/Sidebar"

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

            {/* Admin Routes */}
            <Route path="/Admin/sup/add" element={<AddSupplier />} />
            <Route path="/Admin/sup/All" element={<AllSupplier />} />
            <Route path="/Admin/stock" element={<FetchStock />} />
            <Route path="/Admin/client/add" element={<AddClient />} />
            <Route path="/Admin/Supplier/Profile" element={<SupplierProfile />} />
            <Route path="/Admin/client/All" element={<AllClient />} />
            <Route path="/Admin/profile/update/:id" element={<UpdateProfileAdmin />} />
            <Route path="/Admin/Sup/Profile/:id" element={<SupplierProfile />} />
            <Route path="/Admin/client/Profile/:id" element={<ClientProfile />} />
            <Route path="/Admin/client/profile/update/:id" element={<ClientProfileUpdate />} />

            <Route path="/admin/piechart" element={<CategoryPieChart />} />
            <Route path="/admin/bargraph" element={< CategoryBarGraph/>} />
            <Route path="/admin/lowstock" element={< LowStock/>} />
            <Route path="/admin/updatestock" element={< UpdateStock/>} />

            <Route path="/" element={<AllClaims />} />
            <Route path="admin/updates/:id/:billno" element={<AdminUpdateclaim/>} />

          <Route path="/Admin/DeliveryPerson/add" element={<DeliveryForm />} />
          <Route path="/Admin/DeliveryPerson/getAll" exact element={<DeliveryTable/>} />
          <Route path="/Admin/profile/:deliveryPersonID" element={<ProfileDetails/>} />
          <Route path="/Admin/profiles/:id" element={<EditDeliveryPerson/>} />
          <Route path="/Admin/profile/update/:id" element={<EditDeliveryPerson/>} />
          <Route path="/admin/orders" exact element={<OrderList/>} />
          <Route path="/order/:orderid/:userid" element={<AvailableDeliveryPersonList/>} />

         

            {/* Claim Part */}
              <Route path="/addclaim" element={<AddClaim />} />
              <Route path="/get/:billno" element={<FetchClaim/>}/>
              <Route path="/update/:id/:billno" element={<UpdateClaim/>}/>
              <Route path="/delete/:id/:billno" element={<DeleteClaim/>}/>


            

            {/* Supplier Routes */}
            <Route path="/supplier/home" element={<SupplierHome />} />
            <Route path="/supplier/analyse" element={<SupplierAnalyse />} />

            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='inquiry' element={<Enquiries />} />
              <Route path='enquiries/:id' element={<ViewEnq />} />
              <Route path='order' element={<Orders />} />
              <Route path='order/:id' element={<ViewOrder />} />
            </Route>

            

            <Route path = "/layout" element = {<Layout />}>
              <Route path = "contact" element = {<Contact />}/>
              <Route path = "cart" element = {<Cart />}/>
              <Route path = "my-orders" element = {<Order />}/>
              <Route path = "Checkout" element = {<Checkout />}/>
            </Route>

            <Route path='/sidebar' element={<Sidebar />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

