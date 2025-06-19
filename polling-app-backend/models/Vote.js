const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  optionId: String,
  votedAt: { type: Date, default: Date.now },
});

voteSchema.index({ pollId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
