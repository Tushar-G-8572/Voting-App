const pollService = require('../service/poll.service');

exports.createPoll = async(req,res)=>{
  try{
    const result = await pollService.createPoll(req.body,req.user._id);
    res.status(201).json(result);
  }catch(err){
    res.status(400).json({error:err.message})
  }
}

exports.editPoll = async(req,res) =>{
  try{
    // console.log("req.params",req.params);
    // console.log("req.body",req.body);
    // console.log("req.user._id",req.user._id);
    const result = await pollService.editPoll(req.params,req.body,req.user._id);
    if(!result){
      return res.status(404).json("poll not found");
    }
    res.status(200).json(result);
  }catch(err){
    res.status(400).json({error:err.message})
  }
}

exports.deletePoll = async (req,res)=>{
  try{
    await pollService.deletePoll(req.params.id);
    res.json(201).json({message:"poll deleted Successfully"});

  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

exports.getOpenPoll = async(req,res)=>{
  try{
   const polls = await pollService.getOpenPolls();
   res.json(polls);
  }catch(err){
    res.status(400).json({error:err.message});
  }
}

exports.votePoll = async(req,res)=>{
  try{
      if (req.params && typeof req.params === 'object' && req.params.id) {
      req.params = req.params.id;
        }
    console.log("VotePoll userID",req.user._id);
    console.log("VotePoll pollId",req.params);
    const  options  = req.body;
    const result = await pollService.votePoll(req.params,req.user._id,options);
    console.log(result);
    res.json(result);   
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

exports.viewResult = async(req,res)=>{
  try{
    if (req.params && typeof req.params === 'object' && req.params.id) {
      req.params = req.params.id;
        }
    console.log("ViewResult pollId",req.params);
    const result = await pollService.viewResult(req.params,req.user.id);
    res.json(result);
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

exports.getPollResults = async (req,res)=>{
  if (req.params && typeof req.params === 'object' && req.params.id) {
      req.params = req.params.id;
        }
    console.log(" getPollResult pollId",req.params);
  const result = await pollService.getPollResults(req.params);
  res.json(result);
};

exports.viewVoter = async (req, res) => {
  try {
    const pollId = req.params.id;
    console.log("ViewVoter pollId:", pollId); 

    if (!pollId) {
      return res.status(400).json({ message: 'Missing poll ID' });
    }

    const result = await pollService.getVoter(pollId); // Pass it to service
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

