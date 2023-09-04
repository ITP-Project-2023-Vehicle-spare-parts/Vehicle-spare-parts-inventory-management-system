const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
//const { errorHandler, notFound} = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});


const BranchRouter = require("./routes/BranchRoutes.js");
app.use("/Branch", BranchRouter);

const ProductRoutes = require("./routes/productRoutes.js");
app.use("/product", ProductRoutes);

const SupplierRouter = require("./routes/SupplierRoutes");
app.use("/supplier" , SupplierRouter );

const ClientsRouter = require("./routes/WholeClientsRoutes");
app.use("/clients" , ClientsRouter );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const user = require("./routes/authRoute");
app.use("/api/user" , user);

const deliveryPersonRouter = require("./routes/deliverypersonRoutes");
app.use("/deliveryPerson", deliveryPersonRouter)

const warrentyRouter = require("./routes/warrentyRoutes");
app.use("/warrenty", warrentyRouter);

const stockRoutes = require("./routes/stockRoutes.js");
app.use("/stock", stockRoutes);

//app.use(notFound);
//app.use(errorHandler);

app.use(express.json());

// Endpoint to fetch product name suggestions
app.get("/search", async (req, res) => {
    const { productName } = req.query;
  
    try {
      const suggestions = await Stock.find({
        category: { $regex: productName, $options: "i" }, // Case-insensitive partial match
      })
        .distinct("category")
        .limit(10); // Limit the number of suggestions
  
      res.status(200).json({ suggestions });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });




//import product routes to the server.js


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});