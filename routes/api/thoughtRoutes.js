const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

//get thoughts and create thought
router.route('/').get(getThoughts).post(createThought)

// get a single thought, update a thought, and delete a thought
router.route('/id').get(getSingleThought).put(updateThought).delete(deleteThought);

// create a reaction
router.route('/thoughtId/reactions').post(createReaction)

// delete a reaction
router.route('/thoughtId/reaction/reactionId').delete(deleteReaction)

module.exports = router; 