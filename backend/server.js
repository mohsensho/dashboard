const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Customers = db.customer;
const TaskTypes = db.tasktype;
const TaskStatus = db.taskstatus;

// db.sequelize.sync();
// initial();
/* Just for developing 
//force: true will drop the table if it already exists*/
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SW300 dashboard!" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/task.routes')(app);
require('./app/routes/tasktype.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  // role table initial records
  Role.create({
    name: "admin"
  });
  Role.create({
    name: "user"
  });

  // user table initial record
  User.create({
    username: "shojamo",
    email: "mohsen.shojaeifar@lamresearch.com",
    password: "$2a$08$gDmNSi.g9j2hA8CjPP3f.eMpFVl3Ef3Wq3kzvpE/YMPuZflHKlmv2"
  });
  // Task types table initial records
  TaskTypes.create({
    tType: "Escalation"
  }); 
  TaskTypes.create({
    tType: "Release"
  });
  TaskTypes.create({
    tType: "Patch"
  });

  // Task status table initial records
  TaskStatus.create({
    tStatus: "In progress"
  }); 
  TaskStatus.create({
    tStatus: "On Hold"
  });
  TaskStatus.create({
    tStatus: "Completed"
  });

  // customers table initial records
  Customers.create({
    cName: "Intel"
  }); 
  Customers.create({
    cName: "Micron"
  });
  Customers.create({
    cName: "ROW"
  });
  Customers.create({
    cName: "TSMC"
  });
  Customers.create({
    cName: "Samsung"
  });
}