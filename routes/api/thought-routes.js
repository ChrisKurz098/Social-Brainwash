const router = require('express').Router();
const { addThought,
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReactionToThought,
    deleteReactionFromThought }
    = require('../../controllers/thought-controller');

//routes for single data 
router.route('/')
    .get(getAllThoughts)
    .post(addThought);

//routes for datat by ID
router.route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);

//routes for friend data
router.route('/:thoughtId/friends/:friendId')
    .post(addReactionToThought)
    .delete(deleteReactionFromThought);

    
module.exports = router;
