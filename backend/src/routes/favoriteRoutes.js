const express = require("express");

const asyncHandler = require("../middleware/asyncHandler");
const favoriteController = require("../controllers/favoriteController");

const router = express.Router();

router.get("/user/:userId", asyncHandler(favoriteController.getFavoritesByUser));
router.post("/", asyncHandler(favoriteController.createFavorite));
router.delete("/:id", asyncHandler(favoriteController.deleteFavorite));

module.exports = router;
