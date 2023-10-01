const Coupon = require("../model/couponModel");

// Create a new coupon
const addCoupon = async (req, res) => {
  try {
    const { code, discount,description, expirationDate } = req.body;

    // Check if the branch with the given BranchID already exists
    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
        return res.status(400).json({ status: "Error adding coupon", error: "Code already exists" });
    }

    const coupon = new Coupon({
      code,
      discount,
      description,
      expirationDate,
    });

    await coupon.save();
    res.status(201).json({ status: "Coupon Created", data: coupon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error creating coupon", error: err.message });
  }
};

// Get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error fetching coupons", error: err.message });
  }
};

// Get a coupon by ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ status: "Coupon not found" });
    }
    
    res.status(200).json(coupon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error fetching coupon", error: err.message });
  }
};

// Update a coupon by ID
const updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedCoupon) {
      return res.status(404).json({ status: "Coupon not found" });
    }

    res.status(200).json({ status: "Coupon Updated", data: updatedCoupon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error updating coupon", error: err.message });
  }
};

// Delete a coupon by ID
const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    
    if (!deletedCoupon) {
      return res.status(404).json({ status: "Coupon not found" });
    }

    res.status(200).json({ status: "Coupon Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error deleting coupon", error: err.message });
  }
};

module.exports = {
  addCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
