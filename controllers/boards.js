const Board = require("../models/board");
const Pin = require("../models/pin");

// Create a new board
async function create(req, res) {
  try {
    const { content, description, user_id } = req.body;
    const newBoard = new Board({
      content,
      description,
      user_id,
      pins: [],
      numberOfPins: 0,
    });
    // Save the new board to the database
    const savedBoard = await newBoard.save();
    // Return the saved board as the response
    res.status(201).json(savedBoard);
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ error: "Server error" });
  }
  


//Create new board 
async function createBoard(req, res) {
    try {
        const { content, description, user_id } = req.body;
        const newBoard = new Board({
            content,
            description,
            user_id,
            pins: [],
            numberofPins: 0
        });
        //save the new board to the database 
        const savedBoard = await newBoard.save(); 

        res.status(201).json(savedBoard); // Return the saved board as the response
    } catch (error) {
      console.error('Error creating board:', error);
      res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
    }
  }
  
  

//pins to a specific board  
async function pin(req, res) {
  try {
    const { boardId } = req.params;
    const { title, description, image, user } = req.body;

    // Check if the board exists
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
  }

  module.exports = {
    getAllBoards,
    createBoard,
    pin
};  

