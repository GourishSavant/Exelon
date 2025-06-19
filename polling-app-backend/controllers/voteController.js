const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

exports.vote = async (req, res) => {
  const { optionId } = req.body;
  const { pollId } = req.params;

  const poll = await Poll.findById(pollId);
  const now = new Date();
  console.log("Current Time:", now.toISOString());
console.log("Poll Start Time:", poll.startDate.toISOString());
console.log("Poll End Time:", poll.endDate.toISOString());


  if (now < poll.startDate && now > poll.endDate)
    return res.status(400).json({ msg: 'Poll not active' });


  const vote = new Vote({ pollId, userId: req.user.id, optionId });

  try {
    await vote.save();
    await Poll.updateOne(
      { _id: pollId, 'options.optionId': optionId },
      { $inc: { 'options.$.votes': 1 } }
    );
    res.json({ msg: 'Vote recorded' });
  } catch (err) {
    res.status(400).json({ msg: 'Already voted or error' });
  }
};
