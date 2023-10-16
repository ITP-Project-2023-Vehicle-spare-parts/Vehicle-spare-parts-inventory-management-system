import React, { useState, useEffect } from "react";
import SupplierSideNavigation from "../../SupplierSideNavigation";
import SupplierNavBar from "../../NavBar/SupplierNavBar";
import "./SupplierHome.css";
import "boxicons/css/boxicons.min.css";
import { Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import ChatBot from "react-simple-chatbot";
import { Segment, Label, Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate } from "react-router-dom";

export default function SupplierHome() {
  const [branches, setBranches] = useState([]);
  const [showBot, setShowBot] = useState(false);
  const Navigate = useNavigate();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchLowStockAndShowNotification = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/stock/low-stock"
        );

        if (
          response.data &&
          response.data.lowStockProducts &&
          response.data.lowStockProducts.length > 0
        ) {
          setStocks(response.data.lowStockProducts); // Update the state with fetched data
          console.log(response.data.lowStockProducts);
          // Create a toast notification
          toast.success("Fetch Low Stock Item");
        }
      } catch (error) {
        console.error("Error fetching low stock products:", error);
      }
    };

    fetchLowStockAndShowNotification();
  }, []);

  useEffect(() => {
    function getSupplier() {
      axios
        .get("http://localhost:8000/Branch/", getSupplier)
        .then((res) => {
          console.log(res.data);
          setBranches(res.data);
          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSupplier();
  }, []);

  const data1 = branches.map((branches, index) => ({
    key: index + 1,
    ManagerName: branches.ManagerName,
    BranchName: branches.BranchName,
    TelePhoneNumber: branches.TelePhoneNumber,
    BranchAddress: branches.BranchAddress,
  }));

  const columns = [
    {
      title: "Menager Name",
      dataIndex: "ManagerName",
      align: "left",
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      align: "left",
    },
    {
      title: "Contact Number",
      dataIndex: "TelePhoneNumber",
      align: "left",
    },
    {
      title: "Branch Address",
      dataIndex: "BranchAddress",
      align: "left",
    },
  ];

  function EmailLink(props) {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Description>
            Our support team is available 24/7. Click on the 'Support' tab to
            get assistance or
            <Label
              as="a"
              color="blue"
              tag
              href="mailto:CMspare@gmail.com?subject=Support%20Request%20from%20CM%20Spare%20Portal"
              target="_blank"
              rel="noreferrer"
            >
              Email us
            </Label>
            .
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

  function NavigateAnalyse() {
    useEffect(() => {
      Navigate("/supplier/analyse");
    }, []);

    return null; // This component does not render anything
  }
  function LowStockItemsList() {
    const listStyle = {
      listStyleType: "none", // Remove bullet points
      padding: "0", // Remove padding
      margin: "0", // Remove margin
    };

    const listItemStyle = {
      backgroundColor: "#FF4136", // Red background
      color: "#fff", // White text color
      padding: "8px 12px", // Padding around the text
      margin: "5px 0", // Margin between list items
      borderRadius: "5px", // Rounded corners
      fontWeight: "bold", // Bold text
      border: "1px solid #E90D00", // Add a border around the label
    };

    return (
      <div>
        Low Stock Items & Need Count Is:
        {stocks.length > 0 ? (
          <ul style={listStyle}>
            {stocks.map((stock, index) => (
              <li key={stock._id} style={listItemStyle}>
                {stock.productName} : {stock.reorderpoint - stock.stockQuantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items are currently low on stock.</p>
        )}
      </div>
    );
  }

  function BranchDetailList() {
    return (
      <div>
        Our Branch Locations Are:
        {branches.length > 0 ? (
          branches.map((branch, index) => (
            <Label
              key={branch._id}
              color="red"
              size="large"
              style={{ display: "block", marginTop: "5px" }}
            >
              {branch.BranchName} CM Spare : Managed By Mr: {branch.ManagerName}
            </Label>
          ))
        ) : (
          <p>No Branches Available.</p>
        )}
      </div>
    );
  }

  function ExitMessage() {
    return (
      <div
        style={{
          border: "3px solid #4CAF50",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          background: "linear-gradient(45deg, #e8f5e9, #b2dfdb)",
          boxShadow:
            "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
      >
        <span
          style={{
            fontSize: "1.7em",
            fontWeight: "bold",
            color: "#2E7D32",
            display: "block",
            marginBottom: "10px",
          }}
        >
          <i
            style={{
              marginRight: "10px",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "rotate(20deg)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "rotate(0deg)")
            }
          >
            👋
          </i>
          Goodbye!
        </span>
        <p
          style={{
            margin: "10px 0",
            color: "#555",
          }}
        >
          Thank you for using our chatbot. If you need assistance again, just
          start a new chat. <span style={{ color: "#4CAF50" }}>🌟</span>
        </p>
        <p
          style={{
            fontStyle: "italic",
            color: "#777",
          }}
        >
          Take care and see you soon!
        </p>
      </div>
    );
  }

  function WelcomeMessage() {
    return (
      <div
        style={{
          border: "2px solid #007BFF",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: "#e6f7ff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            lineHeight: "50px",
            fontSize: "24px",
            marginBottom: "10px",
          }}
        >
          🚗
        </span>

        <h2 style={{ color: "#003366", marginTop: "10px" }}>
          Welcome to CM Spare Parts!
        </h2>
        <p style={{ fontSize: "1.1em", margin: "10px 0" }}>
          Where your vehicle's needs come first. We're thrilled to have you
          here.
        </p>
        <p style={{ fontWeight: "bold", color: "#007BFF" }}>
          How can we drive your queries today?
        </p>
      </div>
    );
  }

  const steps = [
    {
      id: "welcome",
      component: <WelcomeMessage />,
      trigger: "askName",
    },
    {
      id: "askName",
      message: "Enter Your Name : ",
      trigger: "Waiting1",
    },
    {
      id: "Waiting1",
      user: true,
      trigger: "name",
    },
    {
      id: "name",
      message: "Hi {previousValue} ,  How can I assist you today?",
      trigger: "main-questions",
    },
    {
      id: "main-questions",
      options: [
        {
          value: "get-started",
          label: "Getting Started",
          trigger: "get-started-answer",
        },
        {
          value: "contact-stock-menager",
          label: "Contact Stock Manager",
          trigger: "contact-stock-menager-answer",
        },
        {
          value: "view-Stock-Level",
          label: "Shop Stock Level",
          trigger: "View-Stock-Level-answer",
        },
        {
          value: "view-low-orders",
          label: "Viewing Low Orders",
          trigger: "view-low-orders-answer",
        },
        {
          value: "view-branch-detail",
          label: "Viewing Branch Details",
          trigger: "view-branch-detail-answer",
        },
        { value: "exit", label: "Exit Chat", trigger: "exit" },
      ],
    },
    {
      id: "get-started-answer",
      message:
        "Get Start to Analyze Stock And Set The Weekly Order List.Check Which Items are Low so Stock can be Filled...",
      trigger: "main-questions",
    },
    {
      id: "contact-stock-menager-answer",
      component: <EmailLink />,
      trigger: "main-questions",
    },

    {
      id: "View-Stock-Level-answer",
      component: <NavigateAnalyse />,
      end: true,
    },
    {
      id: "view-low-orders-answer",
      component: <LowStockItemsList />,
      trigger: "main-questions",
    },
    {
      id: "view-branch-detail-answer",
      component: <BranchDetailList />,
      trigger: "main-questions",
    },
    {
      id: "exit",
      component: <ExitMessage />,
      end: true,
    },
  ];

  return (
    <div
      id="SupplierHome"
      style={{ backgroundColor: "#d8eaeb", height: "100vh" }}
    >
      <SupplierSideNavigation />

      <SupplierNavBar />

      <div class="col-lg-8">
        <div class="row mt-3">
          <div class="col-xxl-4 col-md-6">
            <div class="card info-card sales-card ">
              <div class="filter">
                <a class="icon" href="#!" data-bs-toggle="dropdown">
                  <i class="bx bx-menu"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#!">
                      Today
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#!">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#!">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>

              <div class="card-body">
                <h5 class="card-title">
                  Sales <span>| Today</span>
                </h5>

                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bx bx-cart"></i>
                  </div>
                  <div class="ps-3">
                    <h6>145</h6>
                    <span class="text-success small pt-1 fw-bold">
                      12%
                    </span>{" "}
                    <span class="text-muted small pt-2 ps-1">increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xxl-4 col-md-6">
            <div class="card info-card revenue-card">
              <div class="filter">
                <a class="icon" href="#!" data-bs-toggle="dropdown">
                  <i class="bx bx-menu"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#!">
                      Today
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#!">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#!">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>

              <div class="card-body">
                <h5 class="card-title">
                  Revenue <span>| This Month</span>
                </h5>

                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bx bx-dollar"></i>
                  </div>
                  <div class="ps-3">
                    <h6>$3,264</h6>
                    <span class="text-success small pt-1 fw-bold">8%</span>{" "}
                    <span class="text-muted small pt-2 ps-1">increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xxl-4 col-xl-12">
            <div class="card info-card customers-card">
              <div class="filter">
                <a class="icon" href="#!" data-bs-toggle="dropdown">
                  <i class="bx bx-menu"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#!">
                      Today
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#!">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#!">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  Customers <span>| This Year</span>
                </h5>

                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bx bxs-analyse"></i>
                  </div>
                  <div class="ps-3">
                    <h6>1244</h6>
                    <span class="text-danger small pt-1 fw-bold">12%</span>{" "}
                    <span class="text-muted small pt-2 ps-1">decrease</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="mt-4 " style={{ marginLeft: "200px", padding: "40px" }}>
        <h3 className="mb-5 title">CM Moters Branch Details...</h3>
        <div>
          <Table
            columns={columns}
            dataSource={data1}
            style={{ margin: "10px" }}
          />
        </div>
      </div>

      <Segment className="chatbot-container" floated="right">
        {showBot ? (
          <div>
            <ChatBot steps={steps} width="550px" height="700px" />
            <button onClick={() => setShowBot(false)}>
              <i class="bx bx-x bx-sm"></i>
            </button>
          </div>
        ) : (
          <img
            className="chatbot-icon"
            src="/images/chat2.png"
            alt="Chat Bot Icon"
            onClick={() => setShowBot(true)}
            style={{
              cursor: "pointer",
              width: "75px",
              height: "75px",
              backgroundColor: "#ffffff00",
              border: "none",
            }}
          />
        )}
      </Segment>
    </div>
  );
}
