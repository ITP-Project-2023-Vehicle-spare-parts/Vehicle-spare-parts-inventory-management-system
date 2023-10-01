const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

//test
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
app.use("/supplier", SupplierRouter);

const ClientsRouter = require("./routes/WholeClientsRoutes");
app.use("/clients", ClientsRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = require("./routes/authRoute");
app.use("/user", user);

const deliveryPersonRouter = require("./routes/deliverypersonRoutes");
app.use("/deliveryPerson", deliveryPersonRouter);

const deliveryOrderRoutes = require("./routes/deliveringOrderRoute");
app.use("/deliveryOrder", deliveryOrderRoutes);

const warrentyRouter = require("./routes/warrentyRoutes");
app.use("/warrenty", warrentyRouter);

const stockRoutes = require("./routes/stockRoutes.js");
app.use("/stock", stockRoutes);

const categoryRoutes = require("./routes/productCategoryRoute");
app.use("/category", categoryRoutes);

const brandRoutes = require("./routes/brandRoute");
app.use("/brand", brandRoutes);

const colorRoutes = require("./routes/colorRoute");
app.use("/color", colorRoutes);

const uploadRoutes = require("./routes/uploadRoute");
app.use("/upload", uploadRoutes);

const enqRouter = require("./routes/enqRoute");
app.use("/enquiry", enqRouter);

const allOrder = require("./routes/OrderlistRoutes");
app.use("/allOrder", allOrder);

const couponRoute = require("./routes/couponRoute.js");
app.use("/coupon", couponRoute);

const OffersRoute = require("./routes/OffersRoute.js");
app.use("/Offers", OffersRoute);

const SupplierRequestRoutes = require("./routes/SupplierRequestRoutes");
app.use("/supplierReq", SupplierRequestRoutes);

const deliveredOrderRoutes = require("./routes/deliveredOrdersRoute");
app.use("/deliveredOrders", deliveredOrderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
