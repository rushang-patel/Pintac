// routes/index.js
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boards');

// Get all boards
router.get('/', ensureAuthenticated, boardController.getAllBoards);

// Render the new board form
router.get('/new', ensureAuthenticated, boardController.renderNewBoardForm);

// Create a new board
router.post('/', ensureAuthenticated, boardController.createBoard);

// View a specific board
router.get('/:id', ensureAuthenticated, boardController.getBoardById);

// Update a board
router.put('/:id', ensureAuthenticated, boardController.updateBoard);

// Delete a board
router.delete('/:id', ensureAuthenticated, boardController.deleteBoard);

// Authentication middleware
function ensureAuthenticated(req, res, next) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  // User is not authenticated, redirect to login page or handle as needed
  res.redirect('/login');
}

module.exports = router;
