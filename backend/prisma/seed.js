const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.hairstyle.createMany({
    data: [
      { name: "Buzz Cut", category: "Short" },
      { name: "Low Fade", category: "Modern" },
      { name: "Wolf Cut", category: "Layered" },
      { name: "Crew Cut", category: "Short" },
      { name: "Curly Top Fade", category: "Curly" }
    ],
  });

  console.log("Sample hairstyle data seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
