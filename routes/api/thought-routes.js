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

//routes for reaction data
router.route('/:thoughtId/reactions')
    .post(addReactionToThought)
    
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReactionFromThought);

    
module.exports = router;
