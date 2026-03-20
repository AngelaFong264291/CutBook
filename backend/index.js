const express = require("express");
const cors = require("cors");
const hairstylesRouter = require("./routes/hairstyles");
const categoryRouter = require("./routes/categories");
const favoritesRouter = require("./routes/favorites");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CutBook backend is running" });
});

app.use("/hairstyles", hairstylesRouter);
app.use("/categories", categoryRouter);
app.use("/favorites", favoritesRouter);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


