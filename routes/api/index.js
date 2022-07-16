//Import required packages and routes 
const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

//Read from the routes 
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

//Export router 
module.exports = router;