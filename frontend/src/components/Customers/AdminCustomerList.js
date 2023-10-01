import React, { useEffect, useState } from "react";
import {Table} from "antd";
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Button from "react-bootstrap/esm/Button";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'FullName',
      sorter: (a,z) => a.FullName.length - z.FullName.length,
      align: 'left'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a,z) => a.email.length - z.email.length,
      align: 'left'
    },
    {
      title: 'NIC',
      dataIndex: 'nic',
      align: 'left'
    },
    {
      title: 'City',
      dataIndex: 'city',
      align: 'left'
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      align: 'left'
    }, 
    {
      title: 'Gender',
      dataIndex: 'gender',
      align: 'left'
    }, 
    {
      title: 'Bloked Status',
      dataIndex: 'isBlocked',
      align: 'left',
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    }, 
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'left'
    }, 
  ];

  const AdminCustomerList = () => {
    
    const [Customer, setCustomer] = useState([]);
    const [search, setSearch] = useState("");
    console.log(search);
     
    useEffect(() => {
        function getCustomers() {
          axios
            .get("http://localhost:8000/user/all-users/", getCustomers)
            .then((res) => {
              console.log(res.data);
              setCustomer(res.data);
              toast.success("Data Fetched Successfully!", {
                duration: 3000, // 3 seconds
                position: "top-right", // You can change the position if needed
              });
              
            })
            .catch((err) => {
              alert(err.message);
              toast.error("Data Fetching Error", {
                duration: 3000, // 3 seconds
                position: "top-right", // You can change the position if needed
              });
            });
        }
        getCustomers();
      }, []);

     function DeleteCustomer(id){
        Swal.fire({

            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete("http://localhost:8000/user/" + id);
              window.location.reload();
      
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });

      }

     function generatePDF() {
        const pdf = new jsPDF();
    
        // Add the logo
        const logoURL = '/images/CMLogo.png';
        pdf.addImage(logoURL, 'PNG', 10, 10, 50, 20); // Adjust the coordinates and dimensions as needed
        
        // Set font styles
        pdf.setFont('helvetica');
        pdf.setFontSize(16);
      
        // Add a title
        pdf.text('Customer Report - CMspare', 70, 20);
      
        // Create a table for client data
        const tableData = Customer.map((dataobj, index) => {
          return [
            `${dataobj.firstname} ${dataobj.lastname}`,
            dataobj.email,
            dataobj.nic,
            dataobj.city,
            dataobj.mobile,
            dataobj.isBlocked,
          ];
        });
      
        const tableHeaders = ['Customer Name', 'Email', 'NIC', 'Address', 'Mobile' ,'BlockedStatus'];
      
        // Set the table style
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0); // Text color (black)
        
        // Define the column widths and row heights
    
      
        // Add the table
        pdf.autoTable({
          head: [tableHeaders],
          body: tableData,
          startY: 40, // Adjust the vertical position
          margin: { horizontal: 10 },
          columnStyles: { 0: { cellWidth: 50 } }, // Adjust the column width
          bodyStyles: { valign: 'middle' }, // Vertical alignment for cell content
          columnWidth: 'wrap',
        });
      
        // Save or display the PDF
        pdf.save('Customer-report.pdf'); // Save the PDF with a filename
      }

      const filteredCustomerData = Customer.filter((customer) =>
      customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.nic.toLowerCase().includes(search.toLowerCase())
    );

      const data1 = filteredCustomerData.map((customer, index) => ({
        key: index + 1,
        FullName: `${customer.firstname} ${customer.lastname}`,
        email: customer.email,
        nic: customer.nic,
        city: customer.city,
        mobile: customer.mobile,
        gender: customer.gender,
        isBlocked: customer.isBlocked,
        action: (
          <span className='d-flex'>
            <button className="fs-3 text-warning bg-transparent border-0">
              <BiEdit />
            </button>
            <button className="ms-3 fs-3 text-danger bg-transparent border-0"  onClick={() => DeleteCustomer(customer._id)}>
              <RiDeleteBin5Fill />
            </button>
          </span>
        ),
      }));
    
    return (
      <div>
          <h3 className='mb-4 title'>Customers... </h3>
          <br/>

          <div className="d-flex justify-content-center align-items-center">
          <div class="input-group">
              <input
              className="form-control form-control-lg"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Data..."
              />
              
            </div>
            
            <br/>
          <Button variant="outline-danger" size="lg" style={{marginLeft:"10px" ,width:"300px"}} onClick={generatePDF}>
          <i class='bx bxs-file-pdf bx-tada-hover bx-sm'> Genarate Report</i> 
              </Button>
</div>
              
<br/>
<br/>
          <div className='bg-white'>
              <Table columns={columns} dataSource={data1} />
          </div>
      </div>
    )
    }

  
  export default AdminCustomerList;