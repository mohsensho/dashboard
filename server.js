import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// Pasre requests of content-type - application/json
app.use(json());

// Parse requests of content-type - application/x-www-from-urlencoded
app.use(urlencoded({extended: true}));


//DataBase
import { role, sequelize } from "./models";

/* Just for development */
const Role = role;

sequelize.sync({force:true}).then(() => {
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

// Route
app.get("/", (req,res) =>{
    res.json({ message: "Welcome to Software Team Dashboard!" });
});

require('./routes/auth.routes').default(app);
require('./routes/user.routes.js').default(app);

// Set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
