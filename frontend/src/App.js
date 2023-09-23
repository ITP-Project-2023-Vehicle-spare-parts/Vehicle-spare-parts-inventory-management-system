import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import SupplierSideNavigation from "./components/SupplierSideNavigation";
import AddSupplier from "./components/AddSupplier";
import AddClient from "./components/AddClient";
import SupplierProfile from "./components/SupplierProfile";
import Login from "./components/Login";
import AddStock from './components/stockComponents/addStock';
import FetchStock from './components/stockComponents/fetchStock';

import { Toaster } from "react-hot-toast";

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
          <Route path="/Admin/sup/add" element={<AddSupplier />} />
          <Route path="/Admin/sup/add" element={<AddSupplier />} />
          <Route path="/Admin/client/add" element={<AddClient />} />
          <Route path="/Admin/Supplier/Profile" element={<SupplierProfile />} />
          <Route path='/add-stock' element={<AddStock />} />
          <Route path='/fetch-stock' element={<FetchStock/>} />
        </Routes>



      </div>
    </Router>
  );
}

export default App;
