const prisma = require("../prisma/client");
const createHttpError = require("../utils/httpError");

async function getAllHairstyles() {
  return prisma.hairstyle.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

async function getHairstyleById(id) {
  const hairstyle = await prisma.hairstyle.findUnique({
    where: { id },
  });

  if (!hairstyle) {
    throw createHttpError(404, `Hairstyle ${id} was not found.`);
  }

  return hairstyle;
}

async function createHairstyle(data) {
  const { name, category, published = false } = data;

  return prisma.hairstyle.create({
    data: {
      name,
      category,
      published,
    },
  });
}

async function updateHairstyle(id, data) {
  await getHairstyleById(id);

  const { name, category, published } = data;

  return prisma.hairstyle.update({
    where: { id },
    data: {
      name,
      category,
      published,
    },
  });
}

async function updateHairstylePublishStatus(id, published) {
  await getHairstyleById(id);

  return prisma.hairstyle.update({
    where: { id },
    data: { published },
  });
}

async function deleteHairstyle(id) {
  await getHairstyleById(id);

  await prisma.hairstyle.delete({
    where: { id },
  });

  return { message: "Hairstyle deleted" };
}

module.exports = {
  getAllHairstyles,
  getHairstyleById,
  createHairstyle,
  updateHairstyle,
  updateHairstylePublishStatus,
  deleteHairstyle,
};
