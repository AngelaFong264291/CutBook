const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Return all unique category names from the hairstyle records.
router.get("/", async (req, res) => {
  const hairstyles = await prisma.hairstyle.findMany({
    select: {
      category: true,
    },
  });

  const categories = [...new Set(hairstyles.map((item) => item.category))];

  res.json(categories);
});

// Return all hairstyles that belong to one category.
router.get("/:name/hairstyles", async (req, res) => {
  const categoryName = req.params.name;

  const hairstyles = await prisma.hairstyle.findMany({
    where: {
      category: categoryName,
    },
  });

  res.json(hairstyles);
});

module.exports = router;
