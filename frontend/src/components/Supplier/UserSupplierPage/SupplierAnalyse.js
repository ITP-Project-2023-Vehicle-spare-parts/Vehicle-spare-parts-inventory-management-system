import Chart from "../../Chart";
import SupplierSideNavigation from "../../SupplierSideNavigation";
import React from "react";

export default function SupplierAnalyse() {
  return (
    <div>
      <body>
        <SupplierSideNavigation />

        <center>
          {" "}
          <h1>CM Spare Stock Leval</h1>
        </center>
        <div className="chart" style={{ margin: "60px" }}>
          <Chart />
        </div>

        <div>
          <center><button type="button" class="btn btn-success">Sugest Order</button></center>
        </div>
      </body>
    </div>
  );
}
