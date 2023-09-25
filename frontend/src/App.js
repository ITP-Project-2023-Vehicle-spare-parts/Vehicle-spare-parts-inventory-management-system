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
import Login from "./components/Login";
import AllSupplier from "./components/Supplier/AdminSupplierPage/AllSupplier";
import AllClient from "./components/Client/AllClients";
import FetchStock from "./components/stockComponents/fetchStock";
import UpdateProfileAdmin from "./components/Supplier/AdminSupplierPage/UpdateProfileAdmin";
import SupplierHome from "./components/SupplierHome";
import SupplierAnalyse from "./components/Supplier/UserSupplierPage/SupplierAnalyse";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import Orders from "./pages/Orders";
import Enquiries from "./pages/Enquiries";

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
            <Route
              path="/Admin/Supplier/Profile"
              element={<SupplierProfile />}
            />
            <Route path="/Admin/client/All" element={<AllClient />} />
            <Route
              path="/Admin/profile/update/:id"
              element={<UpdateProfileAdmin />}
            />
            

            {/* Supplier Routes */}
            <Route path="/supplier/home" element={<SupplierHome />} />
            <Route path="/supplier/analyse" element={<SupplierAnalyse />} />

            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="inquiry" element={<Enquiries />} />
              <Route path="enquiries/:id" element={<ViewEnq />} />
              <Route path="order" element={<Orders />} />
              <Route path="order/:id" element={<ViewOrder />} />
              
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
