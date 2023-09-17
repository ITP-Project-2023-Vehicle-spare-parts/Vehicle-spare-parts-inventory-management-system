import {BrowserRouter as  Router ,Route, Routes} from "react-router-dom"
import './App.css';
// import SupplierSideNavigation from "./components/SupplierSideNavigation";
import AddSupplier from "./components/AddSupplier"
import AddClient from "./components/AddClient";
import SupplierProfile from "./components/SupplierProfile";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/Contact";
import Store from "./pages/store";

function App() {
  return (
   <Router>
    <div>

    {/* <SupplierSideNavigation/> */}

    <Routes>
      <Route path ="/Admin/sup/add" element={<AddSupplier/>} />
      <Route path ="/Admin/client/add" element={<AddClient/>} />
      <Route path ="/login" element={<Login/>} />
      <Route path ="/Admin/Supplier/Profile" element={<SupplierProfile/>} />
        <Route path = "/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact />}/>
          <Route path="store" element={<Store />}/>
        </Route>
      
    </Routes>



    </div>
   </Router>
      
      
     
   
  );
}

export default App;
