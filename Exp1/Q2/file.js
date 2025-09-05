const fs = require("fs");

fs.readFile("abc.txt", "utf8", (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log("File Content: ", data);
})