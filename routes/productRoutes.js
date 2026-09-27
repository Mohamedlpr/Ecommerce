const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { tokenVerification, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", tokenVerification, isAdmin, createProduct);
router.patch("/:id", tokenVerification, isAdmin, updateProduct);
router.delete("/:id", tokenVerification, isAdmin, deleteProduct);

module.exports = router;
