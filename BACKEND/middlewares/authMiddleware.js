const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("you are not an admin");
  } else {
    next();
  }
});

const isSupplier = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const SupplierUser = await User.findOne({ email });
  if (SupplierUser.role !== "supplier") {
    throw new Error("you are not an Supplier");
  } else {
    next();
  }
});

const isClient = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const ClientUser = await User.findOne({ email });
  if (ClientUser.role !== "client") {
    throw new Error("you are not an Client");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin, isSupplier, isClient };
