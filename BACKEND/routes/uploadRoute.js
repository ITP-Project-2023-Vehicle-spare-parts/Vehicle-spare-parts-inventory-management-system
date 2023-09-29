const express = require("express");
const {
  uploadImages,
  deleteImages,
} = require("../controller/uploadController");

//const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/UploadImages");
const router = express.Router();

router.post("/", uploadPhoto.array("images", 10), productImgResize, uploadImages);

router.delete("/deleted-image/:id",deleteImages);

module.exports = router;