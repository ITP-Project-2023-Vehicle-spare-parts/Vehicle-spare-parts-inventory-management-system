const express = require("express");
const {
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updateaUser,
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
} = require("../controller/UserController");

const { paymentVerification } = require("../controller/paymentController");
const { checkout } = require("../controller/paymentController");

const { authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const router= express.Router();


router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getallUser);
router.get('/:id',authMiddleware, getaUser);
router.delete('/:id',deleteaUser);
router.put('/:id',updateaUser);

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