import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



export default function AddClaim() {
  const [productname, setproductname] = useState("");
  const [billno, setbillno] = useState("");
  const [purchasedate, setpurchasedate] = useState("");
  const [claimdate, setclaimdate] = useState("");
  const [description, setdescription] = useState("");
  const [email, setemail] = useState("");
  const [contactNo, setcontactno] = useState("");

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    return phoneRegex.test(phone);
  };
  
  
  

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!productname || !billno || !purchasedate || !claimdate || !description || !email || !contactNo) {
    alert("All fields are required.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Invalid email address");
    return;
  }

  // Validate contact number
  if (!validatePhoneNumber(contactNo)) {
    alert("Invalid contact number");
    return;
  }

  try {
    const newWarrenty = {
      productname,
      billno,
      purchasedate,
      claimdate,
      description,
      email,
      contactNo
    };
    const response = await axios.post("http://localhost:8000/warrenty/addclaim", newWarrenty);
    console.log('warrenty added successfully:', response.data);
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Add Successful',
      showConfirmButton: false,
      timer: 1500
    })
    
    
    

    setproductname('');
    setbillno('');
    setpurchasedate('');
    setclaimdate('');
    setdescription('');
    setemail('');
    setcontactno('');
  } catch (err) {
    console.error('Error adding warranty:', err);
  }
};

  return (
    <div style={{ 
     
      backgroundSize: 'cover',
      minHeight: '150vh',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      
  }}>

<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-black">
              <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Add New Warranty</h1>
          </div>
          
      <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#87CEEB"}}>


   
      <form onSubmit={handleSubmit}>
      <div className="mb-3 text-white">
            <label htmlFor="fullname" className="form-label">product name</label>
            <input type="text" className="form-control ml-2 mr-5" id="fullname" placeholder="Enter product name"
              required onChange={(e) => {
                setproductname(e.target.value);
              }} />
          </div>

          <div className="mb-3 text-white">
            <label htmlFor="fullname" className="form-label">bill no</label>
            <input type="text" className="form-control ml-2 mr-5" id="fullname" placeholder="Enter billno"
              required onChange={(e) => {
                setbillno(e.target.value);
              }} />
          </div>

          <div className="col mb-3 text-white">
            <label htmlFor="date" className="form-label">purchasedate:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="MM/DD/YYYY"
              required
          
              onChange={(e) => {
                setpurchasedate(e.target.value);
              }}
            />
          </div>

          <div className="col mb-3 text-white">
            <label htmlFor="date" className="form-label">claim added date:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="MM/DD/YYYY"
              min={getCurrentDate()}
              required
              
              onChange={(e) => {
                setclaimdate(e.target.value);
              }}
            />
          </div>

          <div className="mb-3 text-white">
            <label htmlFor="no" className="form-label">Contact No</label>
            <input type="text" className="form-control ml-2 mr-5" id="fullname" placeholder="enter contact no"
              required onChange={(e) => {
                setcontactno(e.target.value);
              }} />
          </div>

          <div className="mb-3 text-white">
            <label htmlFor="fullname" className="form-label">description</label>
            <input type="text" className="form-control ml-2 mr-5" id="fullname" placeholder="Enter description"
              required onChange={(e) => {
                setdescription(e.target.value);
              }} />
          </div>
              <div className="mb-3 text-white">
              <label htmlFor="fullname" className="form-label">E mail</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            required
            onChange={(e) => {
              console.log("Email value changed:", e.target.value);
              setemail(e.target.value);
            }}
          />
          </div>

          <div className="row justify-content-between">
            <div className="col-4">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>

            <div className="col-4">
              
              <Link to={`/get/:billno`} className="btn btn-warning">View claim</Link>
              
              
            </div>
          </div>
      </form>
    </div>
    </div>
  );
}
