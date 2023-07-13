const express = require('express');
const router = express.Router();
const boardsCtrl = require('..controllers/boards');

//route handles request to retrieve a specific board based on ID 
router.get('/:id', boardsCtrl.getBoard);

//route that handles the request to create a new board
//'maps the 'createBoard' method to the 'boardsCtrl' controller 
router.post('/', boardsCtrl.createBoard);

//route to save a pin to a  board
//allows user to pin a pin to a specific board by board ID
router.post('/:boardId/pin', boardsCtrl.pin);



