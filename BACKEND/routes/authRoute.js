const express = require("express");
const {
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updatedUser,
    userCart,
    getUserCart,
    emptyCart,    
    createOrder,
    getAllOrders,
    getSingleOrders,
    updateOrder,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,
    removeProductFromCart,
    updateProductQuantityFromCart,
    loginAdmin,
    resetPassword,
    unblockUser,
    blockUser,
    forgotPasswordToken,
    logout,
    handleRefreshToken,
    updatePassword,
} = require("../controller/UserController");

const { paymentVerification } = require("../controller/paymentController");
const { checkout } = require("../controller/paymentController");

const { authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const router= express.Router();


router.post("/register", createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get('/all-users', getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get('/:id',authMiddleware, isAdmin, getaUser);
router.delete('/:id', deleteaUser);
router.put('/edit',authMiddleware, updatedUser);

router.put('/block-user/:id',authMiddleware,isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware, isAdmin, unblockUser);

router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaOrder/:id", authMiddleware, isAdmin, getSingleOrders);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getyearlyorders", authMiddleware, getYearlyTotalOrders);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
router.delete("/empty-cart", authMiddleware, emptyCart);

module.exports = router;