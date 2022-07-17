//Import required packages 
const router = require("express").Router();
const { 
    getAllUsers, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser,
    addFriend, 
    removeFriend
} = require("../../controllers/user-controller");

//Routes to get all users and create a user 
router.route("/").get(getAllUsers).post(createUser);

//Routes to get a single user, update user, and delete user 
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

//Routes to get add friend and remove friend 
router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

//Export router 
module.exports = router;