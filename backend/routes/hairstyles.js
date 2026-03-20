// Import Express and Prisma
const express = require("express");
const { PrismaClient } = require("@prisma/client");

// Create a router instance (so we can separate routes from index.js)
const router = express.Router();

// Initialize Prisma (used to talk to the database)
const prisma = new PrismaClient();


// GET /hairstyles
// Get all hairstyles from the database
router.get("/", async (req, res) => {
  // Fetch all hairstyle records
  const hairstyles = await prisma.hairstyle.findMany();

  // Return the data as JSON
  res.json(hairstyles);
});


// GET /hairstyles/:id
// Get one hairstyle by its ID
router.get("/:id", async (req, res) => {
  // Get id from URL and convert it to a number
  const id = Number(req.params.id);

  // Find a single hairstyle with matching id
  const hairstyle = await prisma.hairstyle.findUnique({
    where: { id },
  });

  // Return the result
  res.json(hairstyle);
});


// POST /hairstyles
// Create a new hairstyle
router.post("/", async (req, res) => {
  // Get data from request body
  const { name, category } = req.body;

  // Create a new record in the database
  const newHairstyle = await prisma.hairstyle.create({
    data: { name, category },
  });

  // Return the created item
  res.json(newHairstyle);
});


// PUT /hairstyles/:id
// Update an existing hairstyle
router.put("/:id", async (req, res) => {
  // Get id from URL
  const id = Number(req.params.id);

  // Get updated data from request body
  const { name, category } = req.body;

  // Update the hairstyle in the database
  const updatedHairstyle = await prisma.hairstyle.update({
    where: { id },
    data: { name, category },
  });

  // Return updated result
  res.json(updatedHairstyle);
});


// DELETE /hairstyles/:id
// Delete a hairstyle by ID
router.delete("/:id", async (req, res) => {
  // Get id from URL
  const id = Number(req.params.id);

  // Delete the record from the database
  await prisma.hairstyle.delete({
    where: { id },
  });

  // Send confirmation message
  res.json({ message: "Hairstyle deleted" });
});


// Export the router so it can be used in index.js
module.exports = router;