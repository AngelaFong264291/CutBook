const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4173;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(ROOT, urlPath);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const extension = path.extname(filePath);
    const contentType = MIME_TYPES[extension] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Admin dashboard running at http://localhost:${PORT}`);
});
