const express = require('express');
const router = express.Router();
const boardsCtrl = require('../controllers/boards');

// Route handles request to retrieve a specific board based on ID 
router.get('/:id', boardsCtrl.getBoard);

// Route that handles the request to create a new board
// Maps the 'createBoard' method to the 'boardsCtrl' controller 
router.post('/', boardsCtrl.createBoard);

// Route to save a pin to a board
// Allows user to pin a pin to a specific board by board ID
router.post('/:boardId/pin', boardsCtrl.pin);

module.exports = router;
