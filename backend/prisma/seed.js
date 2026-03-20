const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Insert a batch of sample hairstyle records into the database.
  await prisma.hairstyle.deleteMany();
  await prisma.hairstyle.createMany({
    data: [
      { name: "Buzz Cut", category: "Short", published: true },
      { name: "Low Fade", category: "Modern", published: true },
      { name: "Wolf Cut", category: "Layered", published: false },
      { name: "Crew Cut", category: "Short", published: true },
      { name: "Curly Top Fade", category: "Curly", published: false }
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
