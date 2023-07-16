const Board = require('../models/board');

// Get all boards from the database
const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
};

// Render the new board form
const renderNewBoardForm = (req, res) => {
  res.render('boards/new', { title: 'New Board' });
};

// Create a new board
const createBoard = async (req, res) => {
  try {
    const board = new Board(req.body);
    const savedBoard = await board.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ error: "Failed to create board" });
  }
};

// Get a board by ID from the database
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch board" });
  }
};

// Update a board by ID
const updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete board" });
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
