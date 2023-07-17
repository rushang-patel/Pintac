const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boards');

// Get all boards
router.get('/', boardController.getAllBoards);

// Render the new board form
router.get('/new', boardController.renderNewBoardForm);

// Create a new board
router.post('/create', boardController.createBoard);

// Get board by ID
router.get('/:id', boardController.getBoardById);

// Update a board by ID
router.put('/:id', boardController.updateBoard);

// Delete a board by ID
router.post('/:id/delete', boardController.deleteBoard);

module.exports = router;
