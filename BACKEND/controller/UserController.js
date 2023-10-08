const User = require("../model/userModel");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");
const Coupon = require("../model/couponModel");
const Order = require("../model/orderModel");
const Stock = require("../model/stockModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utills/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");

// Create a User
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// get a user profile by user 

const getUserProfile = asyncHandler(async (req, res) => {
  const {_id } = req.user;
    validateMongoDbId(_id); 
  try {
    const userProfile = await User.findById(_id);
   
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//update user

const updatedUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
 

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        gender: req.body.gender,
        nic: req.body.nic,
        street: req.body.street,
        state: req.body.state,
        city: req.body.city,
        postalcode: req.body.postalcode,
        email: req.body.email,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



//get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    // Replace 'user' with the specific role you want to filter by
    const role = "user";

    const getUsers = await User.find({ role }); // Fetch users with the specified role
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
 

  try {
    const id  = req.params.id;
    console.log(id);

    const getaUser = await User.findById(id);

    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user - delete

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

//unblock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});


const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const addToUserCart = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {productId, color, quantity, price} = req.body;
  const {_id} = req.user;
  validateMongoDbId(_id);

  console.log(req);
  console.log(productId, color, quantity, price);
  try {
    let existingCart = await Cart.findOne({user: _id});

    // Cart already exists for the user
    if (existingCart) {
      const existingProductIndex = existingCart.products.findIndex((product) => product.product.toString() === productId && product.color === color);

      // Product already exists in the cart, update the quantity
      if (existingProductIndex !== -1) {
        existingCart.products[existingProductIndex].count += quantity;

      } else {
        // Product doesn't exist in the cart, add it
        existingCart.products.push({
          product: productId, count: quantity, color, price,
        });
      }

      existingCart.cartTotal += quantity * price;
      existingCart.totalAfterDiscount += quantity * price;

      // Save the updated cart
      existingCart = await existingCart.save();
      res.json(existingCart);

    } else {
      // If no cart exists, create a new one
      const newCart = await new Cart({
        user: _id, products: [{
          product: productId, count: quantity, color, price,
        },], cartTotal: quantity * price, totalAfterDiscount: quantity * price,
      }).save();

      res.json(newCart);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  validateMongoDbId(_id);

  try {
    const cart = await Cart.findOne({user: _id}).populate("products.product");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityInCart = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const {cartItemId, newQuantity} = req.params;

  validateMongoDbId(_id);
  try {
    let existingCart = await Cart.findOne({user: _id});

    // Cart exists for user, check for product
    if (existingCart) {
      const existingProductIndex = existingCart.products.findIndex((product) => product._id.toString() === cartItemId);

      // Product exists in the cart, update the quantity
      if (existingProductIndex !== -1) {
        const newQuantityInt = parseInt(newQuantity);
        const productPrice = existingCart.products[existingProductIndex].price;
        const oldQuantity = existingCart.products[existingProductIndex].count;

        existingCart.products[existingProductIndex].count = newQuantityInt;

        existingCart.cartTotal += (newQuantityInt - oldQuantity) * productPrice;
        existingCart.totalAfterDiscount += (newQuantityInt - oldQuantity) * productPrice;

        existingCart = await existingCart.save();
        res.json(existingCart);
      } else {
        // Handle the case where the cart item with the specified ID was not found
        res.status(404).json({message: 'Cart item not found'});
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  const {cartItemId} = req.params;
  validateMongoDbId(_id);

  try {
    let existingCart = await Cart.findOne({user: _id});

    // Cart exists for user, check for product and remove it
    if (existingCart) {
      const existingProductIndex = existingCart.products.findIndex((product) => product._id.toString() === cartItemId);

      // Product exists in the cart, remove it
      if (existingProductIndex !== -1) {
        const productPrice = existingCart.products[existingProductIndex].price;
        const productQuantity = existingCart.products[existingProductIndex].count;
        existingCart.products.splice(existingProductIndex, 1);

        existingCart.cartTotal -= productPrice * productQuantity;
        existingCart.totalAfterDiscount -= productPrice * productQuantity;

        existingCart = await existingCart.save();

        res.json(existingCart);
      } else {
        // Handle the case where the cart item with the specified ID was not found
        res.status(404).json({message: 'Cart item not found'});
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  validateMongoDbId(_id);

  try {
    const deleteCart = await Cart.deleteOne({user: _id})
    console.log(deleteCart);
    res.json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {shippingInfo, paymentInfo} = req.body;
  const {_id} = req.user;
  try {
    // Get the current month name
    const existingCart = await Cart.findOne({user: _id});


    if (existingCart) {
      const products = existingCart.products;
      const subTotal = existingCart.cartTotal;
      const totalAfterDiscount = existingCart.totalAfterDiscount + 350;

      const newOrder = await new Order({
        user: _id,
        shippingInfo: shippingInfo,
        orderItems: products,
        totalPrice: subTotal,
        totalPriceAfterDiscount: totalAfterDiscount,
      }).save();

      if (newOrder) {
        let productId = existingCart.products[0].product;
        let pro_id = productId.toString(productId);
        let count = existingCart.products[0].count;
        // Delete the cart as the order is successfully created
        const deleteCart = await Cart.deleteOne({user: _id})
        let changeStock = await Stock.findOne({
          product: pro_id
        });
        changeStock.stockQuantity = changeStock.stockQuantity - count;

        await changeStock.save();
        res.json({
          newOrder, success: true,
        });
      } else {
        res.status(500).json({message: 'Order not created'});
      }
    } else {
      res.status(404).json({message: 'Cart not found for user'});
    }

  } catch (error) {
    throw new Error(error);
  }
});


const getMyOrders = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  try {
    const orders = await Order.find({user: _id}).populate("orderItems.product")
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
    const orders = await Order.findOne({_id: id}).populate("orderItems.product")/*.populate("orderItems.color")*/
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
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let d = new Date();
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
  }
  const data = await Order.aggregate([{
    $match: {
      createdAt: {
        $lte: new Date(), $gte: new Date(endDate)
      }
    }
  }, {
    $group: {
      _id: {
        month: "$month"
      }, amount: {$sum: "$totalPriceAfterDiscount"}, count: {$sum: 1}
    }
  }])
  res.json(data)
})


const getYearlyTotalOrders = asyncHandler(async (req, res) => {
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let d = new Date();
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
  }
  const data = await Order.aggregate([{
    $match: {
      createdAt: {
        $lte: new Date(), $gte: new Date(endDate)
      }
    }
  }, {
    $group: {
      _id: null, count: {$sum: 1}, amount: {$sum: "$totalPriceAfterDiscount"}
    }
  }])
  res.json(data)
})

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  addToUserCart,
  getUserCart,
  removeProductFromCart,
  emptyCart,
  updateProductQuantityInCart,
  createOrder,
  getMyOrders,
  getAllOrders,
  getSingleOrders,
  updateOrder,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  loginAdmin,
  resetPassword,
  unblockUser,
  blockUser,
  forgotPasswordToken,
  logout,
  handleRefreshToken,
  updatePassword,
  getUserProfile
};
