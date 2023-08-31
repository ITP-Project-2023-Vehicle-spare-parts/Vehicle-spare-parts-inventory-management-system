import {BrowserRouter as  Router ,Route, Routes} from "react-router-dom"
import './App.css';
import SupplierSideNavigation from "./components/SupplierSideNavigation";
import AddSupplier from "./components/AddSupplier"
import AddClient from "./components/AddClient";

function App() {
  return (
   <Router>
    <div>

    <SupplierSideNavigation/>

    <Routes>
      <Route path ="/Admin/sup/add" element={<AddSupplier/>} />
      <Route path ="/Admin/client/add" element={<AddClient/>} />
    </Routes>



    </div>
   </Router>
      
      
     
   
  );
}

export default App;
