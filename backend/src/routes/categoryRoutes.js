const express = require("express");

const asyncHandler = require("../middleware/asyncHandler");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", asyncHandler(categoryController.getCategories));
router.get("/:name/hairstyles", asyncHandler(categoryController.getCategoryHairstyles));

module.exports = router;
