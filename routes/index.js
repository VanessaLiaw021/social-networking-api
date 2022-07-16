//Import required packages 
const router = require("express").Router();
const apiRoutes = require("./api");

//Read from api directory
router.use("/api", apiRoutes);

//Export router
module.exports = router;