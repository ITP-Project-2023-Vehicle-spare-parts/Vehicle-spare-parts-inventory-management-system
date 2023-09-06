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










    
    module.exports = {
        addStock,
        updateStock,
        getStock,
    };