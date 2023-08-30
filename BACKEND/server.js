const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const morgan = require("morgan")
const { notFound, errorHandler } = require("./middlewares/errorHandler");

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

//access the stocks.js file
//const stockRouter = require("./routes/stocks.js");

//app.use("/stock", stockRouter);
//end of access
const SupplierRouter = require("./routes/SupplierRoutes");
app.use("/supplier" , SupplierRouter );

const ClientsRouter = require("./routes/WholeClientsRoutes");
app.use("/clients" , ClientsRouter );

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});