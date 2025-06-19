const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createPoll,
  getPolls,
  getPollById,
  updatePoll,
  deletePoll,
  getPollResults,
} = require('../controllers/pollController');

router.post('/', auth, createPoll);
router.get('/', getPolls);
router.get('/:pollId', getPollById);
router.put('/:pollId', auth, updatePoll);
router.delete('/:pollId', auth, deletePoll);
router.get('/:pollId/results', getPollResults);

module.exports = router;
