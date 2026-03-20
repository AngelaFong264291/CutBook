const express = require("express");

const hairstyleRoutes = require("./hairstyleRoutes");
const categoryRoutes = require("./categoryRoutes");
const favoriteRoutes = require("./favoriteRoutes");

const router = express.Router();

router.use("/hairstyles", hairstyleRoutes);
router.use("/categories", categoryRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;
