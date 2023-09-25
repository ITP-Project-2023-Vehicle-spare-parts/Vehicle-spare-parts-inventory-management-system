const { generateToken } = require('../config/jwtToken');
const User = require('../model/userModel');
const asyncHandler = require("express-async-handler");

const Product = require("../model/productModel");
const Cart = require("../model/cartModel");
const Coupon = require("../model/couponModel");
const Order = require("../model/orderModel");
const uniqid = require("uniqid");

const validateMongoDbId = require("../utills/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");




const createUser = asyncHandler( async(req,res)=>{
    const email= req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser){
        //create new
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        throw new Error("user exists");
        //already exist
    }
});

const loginUserCtrl = asyncHandler(async (req,res) => {
    const {email,password}= req.body;

    //check if user exists or not
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            id: findUser?._id,
            firstname: findUser?.firstname,
            lastname:findUser?.lastname,
            email: findUser?.email,
            mobile:findUser?.mobile,
            role:findUser?.role,
            token: generateToken(findUser?._id),

        });

    }else{
        throw new Error("Invalid credentials");
    }
});


//get all users

const getallUser = asyncHandler(async(req,res) =>{
    try{
        const getUsers= await User.find();
        res.json(getUsers);

    }catch(error){
        throw new Error(error)
    }
});

//get a single user

const getaUser= asyncHandler(async(req,res)=>{
    console.log(req.params);
    const {id}= req.params;
    try{
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        });

    }catch(error){
        throw new Error(error);
    }
   
});

//delete user

const deleteaUser= asyncHandler(async(req,res)=>{
    console.log(req.params);
    const {id}= req.params;
    try{
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });

    }catch(error){
        throw new Error(error);
    }
   
});

//update user

const updateaUser = asyncHandler(async(req,res)=>{
    const {id}= req.params;
    try{
        const updateaUser= await User.findByIdAndUpdate(id,{
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            mobile:req?.body?.mobile,
            gender:req?.body?.gender,
            address:req?.body?.address,
            nic:req?.body?.nic,
            dob:req?.body?.dob,
        },{
            new:true,
        }
        );
        res.json(updateaUser);

    }catch(error){
        throw new Error(error)
    }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price} = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId : _id,
      productId,
      color,
      price,
      quantity
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id }).populate(
      "productId"
    ).populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const {cartItemId} = req.params;
  validateMongoDbId(_id);
  try {
      const deleteProductFromCart = await Cart.deleteOne({userId : _id, cartItemId})
      res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  console.log(_id);
  validateMongoDbId(_id);
  try {
      const deleteCart = await Cart.deleteMany({userId : _id})
      res.json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const {cartItemId, newQuantity} = req.params;
  validateMongoDbId(_id);
  try {
      const cartItem = await Cart.findOne({userId : _id, _id: cartItemId})
      cartItem.quantity = newQuantity
      cartItem.save()
      res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, PaymentInfo } = req.body;
  const { _id } = req.user;
  
  try {
    // Get the current month name
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
    
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      PaymentInfo,
      user: _id,
      month: currentMonthName, // Set the month name
    });
    
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});


const getMyOrders = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  try {
    const orders = await Order.find({user : _id})/*.populate("user").populate("orderItems.product").populate("orderItems.color")*/
    res.json({
      orders
    })
  } catch (error) {
    throw new Error(error)
  }
})

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user")/*.populate("orderItems.product").populate("orderItems.color")*/
    res.json({
      orders
    })
  } catch (error) {
    throw new Error(error)
  }
})

const getSingleOrders = asyncHandler(async (req, res) => {
  const {id} = req.params
  console.log(id);
  try {
    const orders = await Order.findOne({_id : id}).populate("orderItems.product")/*.populate("orderItems.color")*/
    res.json({
      orders
    })
  } catch (error) {
    throw new Error(error)
  }
})

const updateOrder = asyncHandler(async (req, res) => {
  const {id} = req.params
  console.log(id);
  try {
    const orders = await Order.findById(id)
    orders.orderStatus = req.body.status;
    await orders.save()
    res.json({
      orders
    })
  } catch (error) {
    throw new Error(error)
  }
})


const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
  let monthNames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let d = new Date();
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
  }
  const data = await Order.aggregate([
    {
      $match : {
        createdAt : {
          $lte : new Date(),
          $gte : new Date(endDate)
        }
      }
    },{
      $group : {
        _id : {
          month : "$month"
        }, amount : {$sum : "$totalPriceAfterDiscount"},count : {$sum : 1}
      }
    }
  ])
  res.json(data)
})



const getYearlyTotalOrders = asyncHandler(async (req, res) => {
  let monthNames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let d = new Date();
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
  }
  const data = await Order.aggregate([
    {
      $match : {
        createdAt : {
          $lte : new Date(),
          $gte : new Date(endDate)
        }
      }
    },{
      $group : {
        _id : null,
        count : {$sum : 1},
        amount : {$sum : "$totalPriceAfterDiscount"}
      }
    }
  ])
  res.json(data)
})


  
module.exports={
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updateaUser,
    userCart,
    getUserCart,
    removeProductFromCart,
    emptyCart,
    updateProductQuantityFromCart,
    createOrder,
    getMyOrders,
    getAllOrders,
    getSingleOrders,
    updateOrder,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,
};