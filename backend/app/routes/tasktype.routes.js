module.exports = app => {
    const tasktype = require("../controllers/tasktype.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new Tutorial
     router.post("/", tasktype.create);
  
    // Retrieve all Tutorials
    router.get("/", tasktype.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tasktype.findOne);
  
    app.use('/api/tasktype', router);
  };
  