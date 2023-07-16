const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boards');

// Get all boards
router.get('/', boardController.getAllBoards);

// Render the new board form
router.get('/new', boardController.renderNewBoardForm);

// Create a new board
router.post('/', boardController.createBoard, (req, res) => {
  res.redirect('/boards');
});

// Get board by ID
router.get('/:id', boardController.getBoardById);

// Update a board by ID
router.put('/:id', boardController.updateBoard);

// Delete a board by ID
router.delete('/:id', boardController.deleteBoard);

module.exports = router;
