const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

  // /api/thoughts/:thoughtsId/reactions
  router
  .route('/:thoughtId/reactions')
  .post(addReaction)

  router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)



module.exports = router;