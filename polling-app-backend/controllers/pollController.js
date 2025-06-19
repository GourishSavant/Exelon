const Poll = require('../models/Poll');

exports.createPoll = async (req, res) => {
  const { question, options, startDate, endDate } = req.body;
  const poll = await Poll.create({
    question,
    options: options.map((text, i) => ({ optionId: `opt${i}`, text })),
    startDate,
    endDate,
    createdBy: req.user.id,
  });
  res.status(201).json(poll);
};

exports.getPolls = async (req, res) => {
  const now = new Date();
  const filter =
    req.query.status === 'closed'
      ? { endDate: { $lt: now } }
      : { startDate: { $lte: now }, endDate: { $gte: now } };

  const polls = await Poll.find(filter);
  res.json(polls);
};

exports.getPollById = async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);
  res.json(poll);
};

// exports.updatePoll = async (req, res) => {
//   const poll = await Poll.findById(req.params.pollId);
//   if (poll.createdBy.toString() !== req.user.id || new Date() > poll.endDate)
//     return res.status(403).json({ msg: 'Unauthorized or poll ended' });

//   Object.assign(poll, req.body);
//   await poll.save();
//   res.json(poll);
// };
exports.updatePoll = async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);
  
  console.log("Poll Creator:", poll.createdBy.toString());
  console.log("User ID:", req.user.id);
  console.log("Poll End Date:", poll.endDate);
  console.log("Current Date:", new Date());

  if (poll.createdBy.toString() !== req.user.id || new Date() > poll.endDate)
    return res.status(403).json({ msg: 'Unauthorized or poll ended' });

  Object.assign(poll, req.body);
  await poll.save();
  res.json(poll);
};

exports.deletePoll = async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);
  if (poll.createdBy.toString() !== req.user.id || new Date() > poll.endDate)
    return res.status(403).json({ msg: 'Unauthorized or poll ended' });

  await poll.deleteOne();
  res.json({ msg: 'Deleted' });
};

exports.getPollResults = async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);
  if (new Date() < poll.endDate) return res.status(403).json({ msg: 'Not closed yet' });
  res.json(poll.options);
};
