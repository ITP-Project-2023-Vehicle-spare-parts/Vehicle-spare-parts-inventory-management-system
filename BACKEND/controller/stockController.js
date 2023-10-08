const Stock = require('../model/stockModel');
const Product = require('../model/productModel');
const DeletedStock =require('../model/deletedStockModel');
const Supplier = require("../model/SupplierModel");
//const OrderStock = require("../model/orderStockModel");

 const addStock = async (req, res) => {
    try{
        const {  Title,productName,supplierName,dateAdded,stockAmount,additionalDetails,reorderpoint,stockQuantity} = req.body;
      
        const productid= await Product.findOne({Title: productName});
    
    
        if (!productid) {
          
            return res.status(404).json({ error: 'Product not found' });
          }
    
    const newStock = new Stock({
        product: productid._id,    
        productName,
        supplierName,
        dateAdded,
        stockAmount,
        additionalDetails,
        reorderpoint,
        stockQuantity
        
      });
    
      // Save the new product to the database
      await newStock.save();
    
      res.status(201).json(newStock);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
    };

    //update stock

    const updateStock = async (req, res) => {
      const { id } = req.params; // Extract the stock ID from the URL parameter
    
      try {
        const { stockQuantity, stockAmount, reorderpoint } = req.body;
    
        // Validate if stockQuantity, stockAmount, and reorderpoint are numbers and non-negative
        if (
          typeof stockQuantity !== 'number' ||
          typeof stockAmount !== 'number' ||
          typeof reorderpoint !== 'number' ||
          stockQuantity < 0 ||
          stockAmount < 0 ||
          reorderpoint < 0
        ) {
          return res.status(400).json({ error: 'Invalid input values' });
        }
    
        const stock = await Stock.findById(id);
        if (!stock) {
          return res.status(404).json({ error: 'Stock not found' });
        }
    
        // Update stock quantity and amount
        stock.stockQuantity += stockQuantity;
        stock.stockAmount += stockAmount;
        stock.reorderpoint = reorderpoint;
    
        // Save the updated stock
        await stock.save();
    
        console.log('Stock updated:', stock);
    
        res.status(200).json({ status: 'Stock updated' });
      } catch (error) {
        console.error('Error updating stock:', error.message);
        res.status(500).json({ error: error.message });
      }
    };
    

//get all stock data

const getStock = async (req, res) => {

  try {
    const allStocks = await Stock.find();

    if (!allStocks || allStocks.length === 0) {
      res.status(404).send({ status: "No stocks found" });
      return;
    }

    res.status(200).send({ status: "Stocks fetched", stocks: allStocks });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with getting stocks", error: err.message });
  }
};

//get stock by iD
const getStockByID= (async (req, res) => {

  let stockId = req.params.id;

  try {
    const stock = await Stock.findById(stockId);
    
    if (!stock) {
      res.status(404).send({ status: "Stock not found" });
      return;
    }

    res.status(200).send({ status: "Stock fetched", stock: stock });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get stock", error: err.message });
  }
});

//delete functionality


const deleteStock = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
      console.log("not found");
    }

    // Get the product ID from the stock instance
    const productId = stock.product;

    // Create a new DeletedStock record
    const deletedStock = new DeletedStock({
      product: productId, // Set the product ID from the stock instance
      productName: stock.productName,
      supplierName: stock.supplierName,
      stockAmount: stock.stockAmount,
      additionalDetails: stock.additionalDetails,
      reorderpoint: stock.reorderpoint,
      stockQuantity: stock.stockQuantity,
    });

    // Save the deleted stock record
    await deletedStock.save();

    // Delete the original stock record
    await Stock.deleteOne({ _id: id });

    res.status(200).json({ status: 'Stock deleted and moved to DeletedStock' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getLowStockProducts = async (req, res) => {
  try {
    // Find all stocks where stockQuantity is less than reorderPoint
    const lowStockProducts = await Stock.find();

    if (!lowStockProducts || lowStockProducts.length === 0) {
      return res.status(404).json({ status: "No low stock products found" });
    }

    // Filter low stock products based on reorder point
    const filteredLowStockProducts = lowStockProducts.filter((stock) => {
      return stock.stockQuantity < stock.reorderpoint;
    });

    // Assuming you have a function to place an order with the supplier,
    // you can call it here for each low stock product
    for (const lowStockProduct of filteredLowStockProducts) {
      // Identify the relevant supplier for this product
      const supplierDetails = await Supplier.findOne({ ProvidedCategory: lowStockProduct.productName });

      if (!supplierDetails) {
        console.error(`Supplier not found for ${lowStockProduct.productName}`);
        continue; // Skip this product and continue with the next one
      }

      // Define the productName and quantityToOrder based on your business logic
      const productName = lowStockProduct.productName;
      const quantityToOrder = calculateQuantityToOrder(lowStockProduct); // Implement this function

      // Place an order with the supplier
      await placeOrderWithSupplier(supplierDetails, productName, quantityToOrder);
    }

    res.status(200).json({ status: "Low stock products fetched", lowStockProducts: filteredLowStockProducts });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with getting low stock products", error: err.message });
  }
};

// Function to calculate the quantity to order based on your business logic
const calculateQuantityToOrder = (lowStockProduct) => {
  // Implement your logic to calculate the quantity to order
  // For example, you can use reorder point, historical data, etc.
  // Return the calculated quantity.
};

// Function to place an order with the supplier
const placeOrderWithSupplier = async (supplierDetails, productName, quantityToOrder) => {
  try {
    // Here, you can create an order record to track the order details
    const order = new OrderStock({
      supplier: supplierDetails._id, // Associate the order with the supplier
      productName,
      quantityOrdered: quantityToOrder,
      orderDate: new Date(),
      // Add any other relevant order details here
    });

    // Save the order to the database
    await order.save();

    // You can also implement the actual communication with the supplier's system here,
    // such as sending an API request or an email to place the order with them.

    console.log(`Order placed with ${supplierDetails.CompanyName} for ${quantityToOrder} units of ${productName}`);
  } catch (error) {
    console.error('Error placing order with supplier:', error.message);
  }
};



// Add a new route to search for stocks
const searchStock = async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the URL query parameters

    // Perform a case-insensitive search for stocks whose productName matches the provided query
    const searchResults = await Stock.find({ productName: { $regex: query, $options: 'i' } });

    res.status(200).json({ results: searchResults });
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({ error: error.message });
  }
};



const getCost = async (req, res) => {
  try {
    const today = new Date();
    const lastMonthStart = new Date(today);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setDate(1);

    const lastMonthEnd = new Date(today);
    lastMonthEnd.setDate(0); // Set the date to the last day of the previous month

    const totalCostData = await Stock.aggregate([
      {
        $match: {
          dateAdded: {
            $gte: lastMonthStart,
            $lte: lastMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCost: { $sum: "$stockAmount" }, // Sum the stockAmount field

          
        },
      },
    ]);
    

    const totalCost = totalCostData.length > 0 ? totalCostData[0].totalCost : 0;

    if (!totalCostLogged) { // Check the flag before logging
      console.log(totalCost);
      totalCostLogged = true; // Set the flag to true to prevent further logging
    }

    res.json({ totalCost });
    console.log(totalCost)
  } catch (error) {
    console.error('Error calculating total cost:', error);
    res.status(500).json({ error: error.message });
  }
};














    
       


 










    
    module.exports = {
        addStock,
        updateStock,
        getStock,
        getStockByID,
        deleteStock,
        getLowStockProducts,
        searchStock,
        getCost,
        placeOrderWithSupplier,
        
    };