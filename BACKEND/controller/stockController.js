const Stock = require('../model/stockModel');
const Product = require('../model/productModel');
const DeletedStock =require('../model/deletedStockModel');


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



// New function to get low stock products
const getLowStockProducts = async (req, res) => {
  try {
    // Find all stocks where stockQuantity is less than reorderPoint
    const lowStockProducts = await Stock.find();

    if (!lowStockProducts || lowStockProducts.length === 0) {
      res.status(404).send({ status: "No low stock products found" });
      return;
    }

    // Filter low stock products based on reorder point
    const filteredLowStockProducts = lowStockProducts.filter((stock) => {
      return stock.stockQuantity < stock.reorderpoint;
    });

    res.status(200).send({ status: "Low stock products fetched", lowStockProducts: filteredLowStockProducts });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with getting low stock products", error: err.message });
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




 










    
    module.exports = {
        addStock,
        updateStock,
        getStock,
        getStockByID,
        deleteStock,
        getLowStockProducts,
        searchStock,
    };