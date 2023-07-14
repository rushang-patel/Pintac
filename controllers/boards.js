const Board = require('../models/board');
const Pin = require('../models/pin');


//Define methods for boards: create a new board, view a specific board, save a pin to board 


//Show all boards
async function getAllBoards(req, res) {
    try {
      // Retrieve all boards from the database
      const boards = await Board.find();
  
      res.json(boards); // Return the boards as the response
    } catch (error) {
      console.error('Error retrieving boards:', error);
      res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
    }
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
        //method to recieve board ID from request parameters and pin data from request body
      const { boardId } = req.params;
      const { title, description, image, user } = req.body;
  
      // Check if the board exists
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
  
      // Create a new pin instance
      const newPin = new Pin({
        title,
        description,
        image,
        user,
        board: boardId
      });
  
      // Save the new pin to the database
      const savedPin = await newPin.save();
  
      // Update the board's pins array and numberOfPins field
      board.pins.push(savedPin._id);
      board.numberOfPins = board.pins.length;
      await board.save();
  
      res.json(savedPin); // Return the saved pin as the response
    } catch (error) {
      console.error('Error pinning to board:', error);
      res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
    }
  }

  module.exports = {
    getAllBoards,
    createBoard,
    pin
};  
  
 
  

