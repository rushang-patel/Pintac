const Pin = require('../models/pin');
const Board = require('../models/board');

// Get all pins from the database
const getAllPins = async (req, res) => {
  try {
    const pins = await Pin.find();
    res.render('pintacs/pin', { pins, title: 'All Pins' }); // Pass the title variable
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pins" });
  }
};

// Render the new pin form
const renderNewPinForm = async (req, res) => {
  try {
    const boards = await Board.find();
    res.render('pintacs/new', { title: 'Add Pin', boards }); // Pass the boards variable
  } catch (error) {
    console.error('Failed to fetch boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

// Create a new pin
const createPin = async (req, res) => {
  try {
    const { title, description, image, boardId } = req.body;
    const pin = new Pin({
      title,
      description,
      image,
      user: req.user._id,
      board: boardId // Assign the selected board ID to the pin
    });
    const savedPin = await pin.save();
    console.log('Pin saved:', savedPin);
    res.redirect('/pins');
  } catch (error) {
    console.error('Failed to create pin:', error);
    res.status(500).json({ error: 'Failed to create pin' });
  }
};

// Get a pin by ID from the database
const getPinById = async (req, res) => {
  try {
    const pin = await Pin.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('board'); // Populate the board field

    if (!pin) {
      return res.status(404).json({ error: 'Pin not found' });
    }
    res.render('pin', { pin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pin' });
  }
};


// Update a pin by ID
const updatePin = async (req, res) => {
  try {
    const pin = await Pin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }
    res.status(200).json(pin);
  } catch (error) {
    res.status(500).json({ error: "Failed to update pin" });
  }
};

// Delete a pin by ID
const deletePin = async (req, res) => {
  try {
    const pinId = req.params.id;
    // Find the pin by ID and delete it
    const deletedPin = await Pin.findByIdAndDelete(pinId);
    if (!deletedPin) {
      return res.status(404).json({ error: 'Pin not found' });
    }
    res.redirect('/pins'); // Redirect to the pins index page after successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pin' });
  }
};

module.exports = {
  getAllPins,
  renderNewPinForm,
  createPin,
  getPinById,
  updatePin,
  deletePin,
};



