const fs = require("fs");

fs.access("data.txt", fs.constants.F_OK, (err) => {
    if(err) {
        console.error("File not found!");
    } else {
        const readStream = fs.createReadStream("data.txt", "utf8");
        readStream.on("data", chunk => {
            console.log("Chunk:", chunk);
        });
        readStream.on("error", err => {
            console.error("Error reading file:", err);
        });
    }
});