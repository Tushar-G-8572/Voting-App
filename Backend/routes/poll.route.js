const express = require('express');
const route = express.Router();
const pollController = require('../controller/poll.controller');
const {authenticate,isVoted} = require('../middleware/auth');
const isAdmin = require('../middleware/role');

route.post('/create-poll',authenticate,isAdmin,pollController.createPoll);
route.put('/edit-poll/:id',authenticate,isAdmin,pollController.editPoll);
route.delete('/delete-poll/:id',authenticate,isAdmin,pollController.deletePoll);
route.get('/poll-results/:id',authenticate,isAdmin,pollController.getPollResults);
route.get('/open-poll',authenticate,pollController.getOpenPoll);
route.post('/poll-vote/:id',authenticate,pollController.votePoll);
route.get('/poll-result-view/:id',authenticate,pollController.viewResult);
route.get('/:id/voters',authenticate,pollController.viewVoter);

module.exports = route;