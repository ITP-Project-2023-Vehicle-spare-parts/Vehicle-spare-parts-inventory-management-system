import React from "react";
import ChartGraph from "../../Chart";
import SupplierSideNavigation from "../../SupplierSideNavigation";
import LowStockTable from "./LowaStockTable";
import "./SupplierAnalyse.css"; // Import your CSS file

export default function SupplierAnalyse() {
  return (
    <div className="supplier-analyse-container" id="SupplierAnalyse">
      <SupplierSideNavigation />

      <div className="content">
        <h1 className="page-title">CM Spare Stock Level</h1>
        <div className="chart-container">
          <ChartGraph />
        </div>
        <div className="low-stock-table-container">
          <LowStockTable />
        </div>
      </div>
    </div>
  );
}