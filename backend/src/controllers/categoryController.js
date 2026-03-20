const categoryService = require("../services/categoryService");

async function getCategories(req, res) {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
}

async function getCategoryHairstyles(req, res) {
  const hairstyles = await categoryService.getHairstylesByCategory(req.params.name);
  res.json(hairstyles);
}

module.exports = {
  getCategories,
  getCategoryHairstyles,
};
