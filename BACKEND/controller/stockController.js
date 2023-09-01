const Stock = require('../model/stockModel');
const Product = require('../model/productModel');

 const addStock = async (req, res) => {
    try{
        const {name, productName,supplierName,dateAdded,stockAmount,additionalDetails,reorderpoint,stockQuantity} = req.body;
      
        const product= await Product.findOne({productname:name});
    
    
        if (!product) {
          
            return res.status(404).json({ error: 'Product not found' });
          }
    
    const newStock = new Stock({
        product: product._id,    
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



    
    module.exports = {
        addStock,
        updateStock,
    };