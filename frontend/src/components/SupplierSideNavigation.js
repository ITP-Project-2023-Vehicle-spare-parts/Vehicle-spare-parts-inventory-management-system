// import React , {useState ,useEffect} from "react";
// import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import '../CSS/SupplierSideNavigation.css';
// import axios from "axios";
// import toast from "react-hot-toast";



export default function SupplierSideNavigation() {

    const id = localStorage.getItem("userID");
    console.log(id);

    // const [User, setUser] = useState("");

    // useEffect(() => {
    //     function fetchSupplier() {
    //       axios
    //         .get("http://localhost:8000/supplier/get/" + id)
    //         .then((res) => {
    //           console.log(res.data.supplier);
    //           setUser(res.data.supplier);
    //           toast.success("Data Fetched!", {
    //             duration: 3000, // 3 seconds
    //             position: "top-center", // You can change the position if needed
    //           });
    //         })
    //         .catch((err) => {
    //           alert(err.message);
    //         });
    //     }
    //     fetchSupplier();
    //   }, [id]);
    

    // let btn = document.querySelector("#btn");
    // let sidebar = document.querySelector(".sidebar");
    

    //  btn.onclick = function(){
    //     sidebar.classList.toggle('active');

    //  } 

    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };
     
   
    return(
     <div id="SideNavigation">

<div className={`sidebar ${sidebarActive ? "active" : ""}`}>

        <div className="sidebar">
            <div className="logo_content">
                <div className="logo">
                    <div className="logo_name">
                    
                        <img className="component-3-icon" alt="" src="/images/CMLogo.png"/>
                        <div className="topic-text"><span style={{color:"blue"}}>CM</span> Spare</div>
                       
                        
                        
                    </div>
                    <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i> 
                </div>

                
            </div>

            <ul className="nav_list">
                <li>
                
                    < i className='bx bx-search' onClick={toggleSidebar}></i>
                   <input type="text" placeholder="Search..."/> 
               
                    <dev className="tooltip">Search</dev>

                </li>
                <li>
                <Link to="/supplier/home">
                    < i className='bx bx-grid-alt'></i>
                    <span className="link-name">Dashboard</span>
                    </Link>
                    <dev className="tooltip">Dashboard</dev>

                </li>
                <li>
                <Link to="/supplier/profile">
                <i class='bx bx-user' ></i>
                    <span className="link-name">User</span>
                    </Link>
                    <dev className="tooltip">User</dev>

                </li>
               
                <li>
                <Link to="/supplier/analyse">
                <i className='bx bx-stats'></i>
                    <span className="link-name">Analytics</span>
                    </Link>
                    <dev className="tooltip">Analytics</dev>

                </li>
                <li>
                <Link to="">
                <i className='bx bxs-package' ></i>
                    <span className="link-name">Prodects</span>
                    </Link>
                    <dev className="tooltip">Prodects</dev>

                </li>
                <li>
                <Link to="">
                <i class='bx bx-money' ></i>
                    <span className="link-name">Payment</span>
                    </Link>
                    <dev className="tooltip">Payment</dev>

                </li>
                <li>
                <Link to="/supplier/order">
                <i class='bx bx-cart-alt'></i>
                    <span className="link-name">Orders</span>
                    </Link>
                    <dev className="tooltip">Orders</dev>

                </li>
                <li>
                <Link to="">
                <i class='bx bxs-bell' ></i>
                    <span className="link-name">Notification</span>
                    </Link>
                    <dev className="tooltip">Notification</dev>

                </li>
               


            </ul>

            <div className="profile_content">
                <div className="profile">
                   <div className="profile_details">
                    <img src="/images/me.jpg" alt=""></img>
                    <div className="name_job">
                        <div className="name">Chanuka Devin</div>
                        <div className=""><span style={{color:"#7C7C7C"}}> YAMAHA Company</span></div>
                    </div>
                   </div>
                  <Link to="/"> <i className="bx bx-log-out" id="log_out"></i></Link>


                </div>
            </div>
        </div>

        <div className="home_content">
            <div className="text">
                
            </div>
        </div>

        </div>






  </div>

  
    )
}
  