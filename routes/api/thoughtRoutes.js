const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThoughtById,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThoughtById);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;