const SupplierRequst = require('../model/SupplierRequstModel');
const Supplier = require ('../model/SupplierModel')

const createLowStockOrder = async (req, res) => {
    try {
      const { productname, stockQuantity, reorderpoint, neededStockQuantity, supplierId ,suppliername } = req.body;

      // const suppliername = await Supplier.findById(supplierId);

      const lowStockOrder = new SupplierRequst({
        productname,
        stockQuantity,
        reorderpoint,
        neededStockQuantity,
        supplierId,
        suppliername,
      });
  
      await lowStockOrder.save();
  
      res.status(200).json({ message: 'Low stock order saved successfully' });
    } catch (error) {
      console.error('Error saving low stock order:', error);
      res.status(500).json({ error: 'An error occurred while saving the low stock order' });
    }
  };

  const getRequestList = async (req,res) => {

    try {
      const allRequest = await SupplierRequst.find();

      if (!allRequest || allRequest.length === 0) {
        res.status(404).send({ status: "No Less Re Order Item found" });
        return;
      }
      res.json(allRequest);
      console.log(allRequest);

    }catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with getting Request", error: err.message });
    }
  }

  const deleteAllRequest = async (req, res) => {
    try {
      // Use the deleteMany method to delete all documents in the Clients collection
      await SupplierRequst.deleteMany({});
      res.status(200).send({ status: "All Clients Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error deleting Clients", error: err.message });
    }
  };

  const UpdateOrderQuantity = async (req, res) => {
    const productId = req.params.id;
    const { neededStockQuantity } = req.body;
  
    try {
      // Find the SupplierRequest by ID and update the stock quantity
      const updatedRequest = await SupplierRequst.findByIdAndUpdate(
        productId,
        { neededStockQuantity },
        { new: true } // Return the updated document
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      // Send a success response
      res.status(200).json({ message: "Stock Quantity Updated Successfully", updatedRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }



  module.exports = {
    createLowStockOrder,
    getRequestList,
    deleteAllRequest,
    UpdateOrderQuantity,
  }