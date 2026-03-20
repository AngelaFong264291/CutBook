const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Return all favorites for one user.
router.get("/user/:userId", async (req, res) => {
  const userId = Number(req.params.userId);

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
  });

  res.json(favorites);
});

// Add a hairstyle to favorites.
router.post("/", async (req, res) => {
  const { userId, hairstyleId } = req.body;

  const newFavorite = await prisma.favorite.create({
    data: {
      userId,
      hairstyleId,
    },
  });

  res.json(newFavorite);
});

// Remove a favorite by favorite record id.
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.favorite.delete({
    where: {
      id,
    },
  });

  res.json({ message: "Favorite deleted" });
});

module.exports = router;
