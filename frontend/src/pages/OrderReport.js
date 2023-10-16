import React from 'react';
import jsPDF from 'jspdf';

const OrderReport = ({ orders, status, totalIncome, totalProducts }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add your logo to the PDF
    const imgData = '../images/logo.png'; // Replace 'logo.png' with the path to your logo image
    doc.addImage(imgData, 'PNG', 10, 10, 40, 40); // Adjust the coordinates and dimensions as needed

    // Define the columns for the PDF
    const columns = ['Name', 'Amount', 'Date', 'Status'];

    // Create an array of data for the PDF
    const data = orders.map((order, index) => [
      `${order.user.firstname} ${order.user.lastname}`,
      order.totalPrice,
      new Date(order.createdAt).toLocaleString(),
      status[index], // Add the status here
    ]);

    // Add the table to the PDF document
    doc.autoTable({
      head: [columns],
      body: data,
    });

    // Add total income and total product count to the PDF
    doc.setFontSize(12); // Reset the font size
    doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Product Count: ${totalProducts}`, 14, doc.autoTable.previous.finalY + 20);

    // Save the PDF with a specific filename
    doc.save('order_report.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default OrderReport;
