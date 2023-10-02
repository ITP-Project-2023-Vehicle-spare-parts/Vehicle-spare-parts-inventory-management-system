// controllers/OfferController.js
const Offer = require("../model/OffersModel");

// Create a new offer
const addOffer = async (req, res) => {
  try {
    const {
      productId,
      offerID,
      rate,
      description,
      startDate,
      endDate,
    } = req.body;

     // Check if an offer with the given offerID and productId already exists
     const existingOffer = await Offer.findOne({ offerID });

     if (existingOffer) {
      return res.status(400).json({ status: "Error adding offer", error: "Offer with the given offerID already exists" });
     }

    const offer = new Offer({
      productId, // Associate the offer with the product using productId
      offerID,
      rate,
      description,
      startDate,
      endDate,
    });

    await offer.save();
    res.status(200).json({ status: "Offer Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error adding offer", error: err.message });
  }
};

  
  // // Get all offers with product details
  const getOffers = async (req, res) => {
    try {
      const offers = await Offer.find().populate("productId");
      res.status(200).json(offers);
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "Error fetching offers", error: err.message });
    }
  };
  
  // Get offers for a specific product with product details
  const getOfferByOfferID = async (req, res) => {
    try {
      const offerID = req.params.offerID; // Change parameter name to offerID
      const offer = await Offer.findOne({ offerID }).populate("productId");
  
      if (!offer) {
        return res.status(404).json({ status: "Offer not found" });
      }
  
      res.status(200).json(offer);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error fetching offer by offerID", error: err.message });
    }
  };
  
  //update offer by id
  const updateOffer = async (req, res) => {
    try {
      const updatedOffer = await Offer.findByIdAndUpdate(
        req.params.id, // Use req.params.id directly, which is a string
        req.body,
        { new: true }
      );
  
      if (!updatedOffer) {
        return res.status(404).json({ status: "Offer not found" });
      }
  
      res.status(200).json({ status: "Offer Updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "Error updating offer", error: err.message });
    }
  };
  
  
  // Delete an offer by ID
  const deleteOffer = async (req, res) => {
    try {
      const deletedOffer = await Offer.findOneAndDelete({ offerID: req.params.id });

      if (!deletedOffer) {
        return res.status(404).json({ status: "Offer not found" });
      }
  
      res.status(200).json({ status: "Offer deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: "Error deleting offer", error: err.message });
    }
  };

  const getOfferById = async (req, res) => {
    try {
        const offerCode = req.params.id;
        console.log(req.params.id);

        const offer = await Offer.findById(req.params.id );
        console.log(offer)
        res.status(200).send({ status: "Offer fetched", offer });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching Offer", error: err.message });
    }
}


module.exports = {
    addOffer,
    getOffers,
    getOfferByOfferID,
    updateOffer,
    deleteOffer,
    getOfferById,
};


