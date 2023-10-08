const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  getUserCart,
  emptyCart,
  createOrder,
  getAllOrders,
  getSingleOrders,
  updateOrder,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  removeProductFromCart,
  updateProductQuantityInCart,
  loginAdmin,
  resetPassword,
  unblockUser,
  blockUser,
  forgotPasswordToken,
  logout,
  handleRefreshToken,
  updatePassword,
  getMyOrders,
  addToUserCart,

  getUserProfile,

} = require("../controller/UserController");



const { authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const { paymentVerification } = require("../controller/paymentController");
const { checkout } = require("../controller/paymentController");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/cart", authMiddleware, getUserCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getallorders", getAllOrders);
router.get("/getaOrder/:id", getSingleOrders);
router.put("/updateOrder/:id", updateOrder);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", getMonthWiseOrderIncome);
router.get("/getyearlyorders", getYearlyTotalOrders);
router.get("/:id", getaUser);
router.put("/profile",authMiddleware, getUserProfile);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.put("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityInCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);
router.put("/edit-user/:id", updatedUser);
router.put("/block-user/:id", blockUser);
router.put("/unblock-user/:id",unblockUser);
router.post("/cart", authMiddleware, addToUserCart);



module.exports = router;
