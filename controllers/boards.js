const Board = require('../models/board');
const Pin = require('../models/pin');


//Define methods for boards: create a new board, view a specific board, save a pin to board \
//Do we want to view ALL boards? index method needed

module.exports = {
    create,
    show,
    pin
};

async function create(req, res) {
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
  
  module.exports = { create };

async function show(req, res) {
  try {
    const { boardId } = req.params;

    // Retrieve the board from the database based on the board ID
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json(board); // Return the board as the response
  } catch (error) {
    console.error('Error retrieving board:', error);
    res.status(500).json({ error: 'Server error' }); // Return an error response if something goes wrong
  }
}

module.exports = { show };  

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
    pin
  };
 
  


const board = require('../pin/board');

module.exports = {
    create
};

async function create(req, res) {
    const board = await board.findById(req.params.id);
  
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    // We can push (or unshift) subdocs into Mongoose arrays
    pin.board.push(req.body);
    try {
      // Save any changes made to the board doc
      await board.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/Boards/${pin._id}`);
  }
