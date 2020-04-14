const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// Pasre requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


//DataBase
const db = require("./app/models");

/* Just for development */
const Role = db.role;

db.sequelize.sync({force:true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial(){
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "admin"
    });
}
/* end Just for development */

/* Just for Production
   db.sequelize.sync();
   end Just for Production */

// Simple route
app.get("/", (req,res) =>{
    res.json({ message: "Welcome to Software Team Dashboard!" });
});

// Set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);