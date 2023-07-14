const express = require('express');
const router = express.Router();
const boardsCtrl = require('../controllers/boards');


//route handles to show all boards
router.get('/', boardsCtrl.getAllBoards);
router.get('/new', boardsCtrl.renderNewBoardForm);
//route that handles the request to create a new board
//'maps the 'createBoard' method to the 'boardsCtrl' controller
router.post('/', boardsCtrl.newBoard);
//route to save a pin to a  board
//allows user to pin a pin to a specific board by board ID
router.post('/:boardId/pin', boardsCtrl.pin);
module.exports = router;

