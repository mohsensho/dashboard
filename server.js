const express = require("express");
const bodyParser = require("body-parser");
const cors = require("corse");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// Pasre requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Simple route
app.get("/", (req,res) =>{
    res.json({ message: "Welcome to Software Team Dashboard!" });
});

// Set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
