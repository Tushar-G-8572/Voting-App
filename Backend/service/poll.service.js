const Poll = require('../models/poll.model');

exports.createPoll = async(data,adminId)=>{
    const {question,options,correctOption,closingDateTime} = data;
    if(options.length < 2 ){
        throw new Error("At least two Options required");
    }
    const newPoll = new Poll({
        question,
        options: options.map(opt =>({text:opt})),
        correctOption,
        closingDateTime,
        createdBy:adminId
    });
    return await newPoll.save();
}

exports.editPoll = async (pollId,data,adminId)=>{
    if (pollId && typeof pollId === 'object' && pollId.id) {
    pollId = pollId.id;
  }
    console.log("adminID",adminId);
    console.log("pollId",pollId);
    const editedPoll = await Poll.findOneAndUpdate(
  { _id: pollId, createdBy: adminId }, 
  data,
  { new: true }
);
console.log("editedPoll is" ,editedPoll);
return editedPoll
}


exports.deletePoll = async(pollId)=>{
    return await Poll.findByIdAndDelete(pollId);
}

exports.getOpenPolls = async()=>{
    const now = new Date();
    return await Poll.find({
        closingDateTime:{$exists: true, $type:'date',$gt:now},
        isClosed: false,
    }).populate('createdBy', 'name role');
}

exports.votePoll = async (pollId, userIdRaw, optionIndexRaw) => {
  const userId = userIdRaw.toString();
  if (
    typeof optionIndexRaw !== 'object' ||
    optionIndexRaw.optionIndex === undefined
  ) {
    throw new Error("Invalid option index format");
  }

  const optionIndex = Number(optionIndexRaw.optionIndex);
  if (isNaN(optionIndex)) throw new Error("Option index must be a number");

  const polls = await Poll.findById(pollId);
  if (!polls) throw new Error('Poll Not Found');

  if (polls.voters.some(voter => voter.toString() === userId)) {
    throw new Error('You have already voted!');
  }

  if (optionIndex < 0 || optionIndex >= polls.options.length) {
    throw new Error("Invalid option index");
  }

  polls.options[optionIndex].votes += 1;
  polls.voters.push(userId);

  polls.markModified('options');
  polls.markModified('voters');

  await polls.save()
    .then(() => console.log("Vote saved successfully"))
    .catch((err) => {
      console.error("Error saving vote:", err);
      throw new Error("Failed to save vote");
    });

  const correctText = polls.options[polls.correctOption]?.text || "Not Available";

  return {
    message: 'Vote Submitted',
    correctAnswer: correctText
  };
};


exports.viewResult = async(pollId,userId)=>{
    // console.log("pollId is",pollId,"userId is",userId)
    const polls = await Poll.findById(pollId);
    const hasVoted = polls.voters.includes(userId);
    const isClosed = polls.isClosed || new Date() > polls.closingDateTime;

    if(!isClosed && !hasVoted) throw new Error('You have Vote or wait Untill poll closes');

    return {
        question :polls.question,
        options: polls.options.map(opt=>({text:opt.text,votes:opt.votes}))
    };
};

exports.getPollResults = async(pollId)=>{
    const polls = await Poll.findById(pollId);
    const correctOptionText = polls.options[polls.correctOption]?.text || "Not available";
    return{
        question:polls.question,
        result: correctOptionText,
        time: polls.closingDateTime
    }
}

exports.getVoter = async(pollId)=>{
    const poll = await Poll.findById(pollId)
      .populate('voters', 'username email') 
      .exec();
    if (!poll) throw new Error('No Poll Found');
    return ({ voters: poll.voters })
}

 