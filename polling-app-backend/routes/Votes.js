const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { vote } = require('../controllers/voteController');

router.post('/:pollId/vote', auth, vote);

module.exports = router;
