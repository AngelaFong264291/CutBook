const favoriteService = require("../services/favoriteService");
const parseId = require("../utils/parseId");

async function getFavoritesByUser(req, res) {
  const userId = parseId(req.params.userId, "User");
  const favorites = await favoriteService.getFavoritesByUserId(userId);

  res.json(favorites);
}

async function createFavorite(req, res) {
  const favorite = await favoriteService.createFavorite(req.body);
  res.status(201).json(favorite);
}

async function deleteFavorite(req, res) {
  const id = parseId(req.params.id, "Favorite");
  const result = await favoriteService.deleteFavorite(id);

  res.json(result);
}

module.exports = {
  getFavoritesByUser,
  createFavorite,
  deleteFavorite,
};
