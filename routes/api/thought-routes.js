//Import required packages 
const router = require("express").Router();
const {
    getAllThoughts, 
    getSingleThought,
    createThought, 
    updateThought,  
    deleteThought, 
    addReaction, 
    removeReaction
} = require("../../controllers/thought-controller");

//Router to get all thoughts and create thought 
router.route("/").get(getAllThoughts).post(createThought);

//Router to get a single thought, update thought, delete thought 
router.route("/:id").get(getSingleThought).put(updateThought).delete(deleteThought);

//Router to add reaction 
router.route("/:thoughtId/reactions").post(addReaction);

//Router to delete reaction 
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

//Export router 
module.exports = router;