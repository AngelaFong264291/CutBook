const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CutBook backend is running" });
});

app.get("/hairstyles", (req, res) => {
  res.json([
    { id: 1, name: "Buzz Cut", category: "Short" },
    { id: 2, name: "Fade", category: "Modern" },
    { id: 3, name: "Wolf Cut", category: "Layered" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
