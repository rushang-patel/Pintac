const Board = require('../models/board');

// Get all boards from the database
const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.render('pintacs/board', { boards, title: 'All Boards' }); // Pass the title variable
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
};

// Render the new board form
const renderNewBoardForm = (req, res) => {
  res.render('pintacs/newboard', { title: 'New Board' });
};

// Create a new board
const createBoard = async (req, res) => {
  try {
    const board = new Board({
      user_id: req.user._id, // Set the user_id
      title: req.body.title,
      description: req.body.description
    });
    const savedBoard = await board.save();
    console.log('Board saved:', savedBoard);
    res.redirect('/boards');
  } catch (error) {
    console.error('Failed to create board:', error);
    res.status(500).json({ error: "Failed to create board" });
  }
};


// Get a board by ID from the database
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.render('board', { board });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch board' });
  }
};

// Update a board by ID
const updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to update board" });
  }
};

// Delete a board by ID
const deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    // Find the board by ID and delete it
    const deletedBoard = await Board.findByIdAndDelete(boardId);
    if (!deletedBoard) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.redirect('/boards'); // Redirect to the boards index page after successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete board' });
  }
};


module.exports = {
  getAllBoards,
  renderNewBoardForm,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
};
