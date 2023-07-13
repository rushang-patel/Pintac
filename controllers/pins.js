const Pin = require('../models/pin');

// Get all pins from the database
const getAllPins = async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pins" });
  }
};

// Get a pin by ID from the database
const getPinById = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }
    res.status(200).json(pin);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pin" });
  }
};

// Create a new pin
const createPin = async (req, res) => {
  try {
    const pin = new Pin(req.body);
    const savedPin = await pin.save();
    res.status(201).json(savedPin);
  } catch (error) {
    res.status(500).json({ error: "Failed to create pin" });
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
    const pin = await Pin.findByIdAndDelete(req.params.id);
    if (!pin) {
      return res.status(404).json({ error: "Pin not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete pin" });
  }
};

const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};


module.exports = {
  getAllPins,
  getPinById,
  createPin,
  updatePin,
  deletePin,
  createComment,
};
