import React, { useState, useEffect } from "react";
import SupplierSideNavigation from "../../SupplierSideNavigation";
import SupplierNavBar from "../../NavBar/SupplierNavBar";
import "./SupplierHome.css";
import "boxicons/css/boxicons.min.css";
import { Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

export default function SupplierHome() {
  const [branches, setBranches] = useState([]);

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
    </div>
  );
}
