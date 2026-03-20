const prisma = require("../prisma/client");

async function getAllCategories() {
  const hairstyles = await prisma.hairstyle.findMany({
    select: {
      category: true,
    },
    orderBy: {
      category: "asc",
    },
  });

  return [...new Set(hairstyles.map((item) => item.category))];
}

async function getHairstylesByCategory(categoryName) {
  return prisma.hairstyle.findMany({
    where: {
      category: categoryName,
    },
    orderBy: {
      id: "asc",
    },
  });
}

module.exports = {
  getAllCategories,
  getHairstylesByCategory,
};
