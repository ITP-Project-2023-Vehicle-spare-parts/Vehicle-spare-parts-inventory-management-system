import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Button from "react-bootstrap/esm/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Customer Name",
    dataIndex: "FullName",
    sorter: (a, z) => a.FullName.length - z.FullName.length,
    align: "left",
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, z) => a.email.length - z.email.length,
    align: "left",
  },
  {
    title: "NIC",
    dataIndex: "nic",
    align: "left",
  },

  {
    title: "Mobile",
    dataIndex: "mobile",
    align: "left",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    align: "left",
  },

  {
    title: "Status to change",
    dataIndex: "action",
    align: "left",
  },
  {
    title: "Action",
    dataIndex: "action2",
    align: "left",
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

  const blockUser = async (id) => {
    try {
      await axios.put(`http://localhost:8000/user/block-user/${id}`);
      setCustomer((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer._id === id ? { ...customer, isBlocked: true } : customer
        )
      );
      toast.success("User Blocked Successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Block User Error:", error);
      toast.error("Error Blocking User", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const unblockUser = async (id) => {
    try {
      await axios.put(`http://localhost:8000/user/unblock-user/${id}`);
      setCustomer((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer._id === id ? { ...customer, isBlocked: false } : customer
        )
      );
      toast.success("User Unblocked Successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Unblock User Error:", error);
      toast.error("Error Unblocking User", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  function DeleteCustomer(id) {
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
    const logoURL = "/images/CMLogo.png";
    pdf.addImage(logoURL, "PNG", 10, 10, 50, 20); // Adjust the coordinates and dimensions as needed

    // Set font styles
    pdf.setFont("helvetica");
    pdf.setFontSize(16);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;


    // Add a title
    pdf.text("Customer Report - CMspare", 70, 20);

    // Create a table for client data
    const tableData = Customer.map((dataobj, index) => {
      return [
        `${dataobj.firstname} ${dataobj.lastname}`,
        dataobj.email,
        dataobj.nic,
        `${dataobj.street} ,${dataobj.city},${dataobj.state}`,
        dataobj.mobile,
        dataobj.isBlocked,
      ];
    });

    const tableHeaders = [
      "Customer Name",
      "Email",
      "NIC",
      "Address",
      "Mobile",
      "Blocked Status",
    ];

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
      //columnStyles: { 0: { cellWidth: 50 } }, // Adjust the column width
      bodyStyles: { valign: "middle" }, // Vertical alignment for cell content
      columnWidth: "auto",

      columnStyles: {
        0: { columnWidth: 30 },
        1: { columnWidth: 40 }, 
        2: { columnWidth: 30 }, 
        3: { columnWidth: 50 }, 
        4: { columnWidth: 30 }, 
        5: { columnWidth: 15 }, 
      },
    });

    // Add address
    pdf.setFontSize(10);
    
    pdf.text(`${formattedDate}`, 150, 25);


    // Save or display the PDF
    pdf.save("Customer-report.pdf"); // Save the PDF with a filename
  }

  const filteredCustomerData = Customer.filter(
    (customer) =>
      customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.nic.toLowerCase().includes(search.toLowerCase())
  );

  const data1 = filteredCustomerData.map((customer, index) => ({
    key: index + 1,
    FullName: `${customer.firstname} ${customer.lastname}`,
    email: customer.email,
    nic: customer.nic,

    mobile: customer.mobile,
    gender: customer.gender,
    isBlocked: (
      <div
        dangerouslySetInnerHTML={{
          __html: customer.isBlocked ? "Blocked" : "Unblocked",
        }}
      />
    ),
    action: (
      <span className="d-flex">
        <button
          className={`fs-3 btn btn-outline-primary ${
            customer.isBlocked ? "text-success" : "text-danger"
          } bg-transparent border-0`}
          onClick={() =>
            customer.isBlocked
              ? unblockUser(customer._id)
              : blockUser(customer._id)
          }
        >
          {customer.isBlocked ? "Unblock" : "Block"}
        </button>
      </span>
    ),
    action2: (
      <span className="d-flex">
        <Link
          to={`/admin/customer/${customer._id}`} // Link to view customer details
          className="ms-3 fs-3 text-info bg-transparent border-0"
        >
          <AiOutlineEye />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => DeleteCustomer(customer._id)}
        >
          <RiDeleteBin5Fill />
        </button>
      </span>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Customers... </h3>
      <br />

      <div className="d-flex justify-content-center align-items-center">
        <div class="input-group">
          <input
            className="form-control form-control-lg"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Data..."
          />
        </div>

        <br />
        <Button
          variant="outline-danger"
          size="lg"
          style={{ marginLeft: "10px", width: "300px" }}
          onClick={generatePDF}
        >
          <i class="bx bxs-file-pdf bx-tada-hover bx-sm"> Genarate Report</i>
        </Button>
      </div>

      <br />
      <br />
      <div className="bg-white">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default AdminCustomerList;
