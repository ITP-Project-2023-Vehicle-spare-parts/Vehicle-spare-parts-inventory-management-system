import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import SupplierSideNavigation from "./components/SupplierSideNavigation";
import AddSupplier from "./components/Supplier/AdminSupplierPage/AddSupplier";
import AddClient from "./components/Client/AddClient";
import SupplierProfile from "./components/Supplier/AdminSupplierPage/SupplierProfile";
import Login from "./components/Login";

import { Toaster } from "react-hot-toast";
import AllSupplier from "./components/Supplier/AdminSupplierPage/AllSupplier";
import AllClient from "./components/Client/AllClients";
import FetchStock from "./components/stockComponents/fetchStock";
import UpdateProfileAdmin from "./components/Supplier/AdminSupplierPage/UpdateProfileAdmin";
import SupplierHome from "./components/SupplierHome";
import SupplierAnalyse from "./components/Supplier/UserSupplierPage/SupplierAnalyse";




function App() {
  return (
    <Router>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
        ></Toaster>

        <Routes>
          <Route path="/" element={<Login />} />

          {/* Admin Routes */}

          <Route path="/Admin/sup/add" element={<AddSupplier />} />
          <Route path="/Admin/sup/All" element={<AllSupplier />} />

          <Route path="/Admin/stock" element={<FetchStock />} />

          <Route path="/Admin/client/add" element={<AddClient />} />

          <Route path="/Admin/Supplier/Profile" element={<SupplierProfile />} />

          <Route path="/Admin/client/All" element={<AllClient />} />

          <Route
            path="/Admin/profile/update/:id"
            element={<UpdateProfileAdmin />}
          />

          <Route path="/Admin/Sup/Profile/:id" element={<SupplierProfile />} />

          {/* Supplier Routes */}
          <Route path="/supplier/home" element={<SupplierHome />} />
          <Route path="/supplier/analyse" element={<SupplierAnalyse />} />



         
         


         


         



        </Routes>
      </div>
    </Router>
  );
}

export default App;
