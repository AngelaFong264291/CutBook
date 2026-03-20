const { PrismaClient } = require("@prisma/client");

// Reuse one Prisma client across the app to avoid creating extra connections.
const prisma = new PrismaClient();

module.exports = prisma;
