const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  optionId: String,
  text: String,
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

pollSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Poll', pollSchema);
