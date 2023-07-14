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
}

// View a specific board
async function show(req, res) {
  try {
    const { boardId } = req.params;

    // Retrieve the board from the database based on the board ID
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    // Return the board as the response
    res.json(board);
  } catch (error) {
    console.error("Error retrieving board:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Save a pin to a board
async function pin(req, res) {
  try {
    const { boardId } = req.params;
    const { title, description, image, user } = req.body;

    // Check if the board exists
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    // Create a new pin instance
    const newPin = new Pin({
      title,
      description,
      image,
      user,
      board: boardId,
    });

    // Save the new pin to the database
    const savedPin = await newPin.save();

    // Update the board's pins array and numberOfPins field
    board.pins.push(savedPin._id);
    board.numberOfPins = board.pins.length;
    await board.save();

    // Return the saved pin as the response
    res.json(savedPin);
  } catch (error) {
    console.error("Error pinning to board:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  create,
  show,
  pin,
};
