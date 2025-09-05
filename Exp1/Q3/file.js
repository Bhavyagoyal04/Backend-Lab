const http = require('http');
const fs = require('fs');
const PORT = 3000;

http.createServer((req, res) => {
    fs.readFile("sample.txt", "utf8", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});