const prisma = require("../prisma/client");
const createHttpError = require("../utils/httpError");

async function getFavoritesByUserId(userId) {
  return prisma.favorite.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
  });
}

async function createFavorite(data) {
  const { userId, hairstyleId } = data;

  return prisma.favorite.create({
    data: {
      userId,
      hairstyleId,
    },
  });
}

async function deleteFavorite(id) {
  const favorite = await prisma.favorite.findUnique({
    where: { id },
  });

  if (!favorite) {
    throw createHttpError(404, `Favorite ${id} was not found.`);
  }

  await prisma.favorite.delete({
    where: { id },
  });

  return { message: "Favorite deleted" };
}

module.exports = {
  getFavoritesByUserId,
  createFavorite,
  deleteFavorite,
};
