const express = require("express");

const asyncHandler = require("../middleware/asyncHandler");
const hairstyleController = require("../controllers/hairstyleController");

const router = express.Router();

router.get("/", asyncHandler(hairstyleController.getHairstyles));
router.get("/:id", asyncHandler(hairstyleController.getHairstyle));
router.post("/", asyncHandler(hairstyleController.createHairstyle));
router.put("/:id", asyncHandler(hairstyleController.updateHairstyle));
router.patch("/:id/publish", asyncHandler(hairstyleController.updatePublishStatus));
router.delete("/:id", asyncHandler(hairstyleController.deleteHairstyle));

module.exports = router;
