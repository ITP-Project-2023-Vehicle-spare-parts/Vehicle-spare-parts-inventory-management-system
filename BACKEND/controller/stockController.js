const Stock = require('../model/stockModel');
const Product = require('../model/productModel');

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

  const updateStock = async (req, res) => {

        
  let stockId = req.params.id;

  
 

  //destructure
  const {productName,stockAmount,additionalDetails,reorderpoint,stockQuantity} = req.body;
      

  const updateStock = {
    productName,
    stockAmount,
    additionalDetails,
    reorderpoint,
    stockQuantity
   
    
     
  }

  const update = await Stock.findByIdAndUpdate(stockId, updateStock).then(() => {
      res.status(200).send({status: "Stock updated"})
  }).catch((err) => {
      console.log(err);
      res.status(500).send({status: "Error with updating data", error: err.message});
  })

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

// Delete a stock record and move it to DeletedStock
const deleteStock = async (req, res) => {
  const { id } = req.params;
  
 

  try {
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
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
await Stock.deleteOne({ _id: id }); // This line deletes the stock record

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



 










    
    module.exports = {
        addStock,
        updateStock,
        getStock,
        getStockByID,
        deleteStock,
        getLowStockProducts,
    };