const router = require('express').Router();
const { addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriendToUser,
    deleteFriendFromUser }
    = require('../../controllers/user-controller');

//routes for single data 
router.route('/')
    .get(getAllUsers)
    .post(addUser);

//routes for datat by ID
router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

//routes for friend data
router.route('/:userId/friends/:friendId')
    .post(addFriendToUser)
    .delete(deleteFriendFromUser);

    
module.exports = router;
