const Pin = require('../models/pin');
const Board = require('../models/board');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

// Get all pins from the database
const getAllPins = async (req, res) => {
  try {
    const pins = await Pin.find().populate('comments');
    res.render('pintacs/pin', { pins, title: 'All Pins' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pins' });
  }
};

// Render the new pin form
const renderNewPinForm = async (req, res) => {
  try {
    const boards = await Board.find();
    res.render('pintacs/new', { title: 'Add Pin', boards });
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
      board: boardId,
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
    const pin = await Pin.findById(req.params.id)
      .populate('board')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
        },
      });
    if (!pin) {
      return res.status(404).json({ error: 'Pin not found' });
    }
    res.render('pin', { pin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pin' });
  }
};

//Add Comments by ID
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
      return res.status(404).json({ error: 'Pin not found' });
    }

    const comment = new Comment({
      text,
      user: req.user._id // Assuming the user ID is stored in req.user._id
    });

    pin.comments.push(comment);
    await Promise.all([comment.save(), pin.save()]);

    res.redirect('/pins');
  } catch (error) {
    console.error('Failed to add comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};


// Update a pin by ID
const updatePin = async (req, res) => {
  try {
    const pin = await Pin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pin) {
      return res.status(404).json({ error: 'Pin not found' });
    }
    res.status(200).json(pin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pin' });
  }
};

// Delete a pin by ID
const deletePin = async (req, res) => {
  try {
    const pinId = req.params.id;
    const deletedPin = await Pin.findByIdAndDelete(pinId);
    if (!deletedPin) {
      return res.status(404).json({ error: 'Pin not found' });
    }
    res.redirect('/pins');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pin' });
  }
};

// Create a new comment
const createComment = async (req, res) => {
  const { pinId, content, author } = req.body;

  try {
    // Find the pin by its ID
    const pin = await Pin.findById(pinId);

    if (!pin) {
      return res.status(404).json({ error: 'Pin not found' });
    }

    // Create a new comment
    const newComment = {
      content,
      author,
    };

    // Add the comment to the pin's comments array
    pin.comments.push(newComment);

    // Save the updated pin
    await pin.save();

    // Respond with the created comment
    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllPins,
  renderNewPinForm,
  createPin,
  getPinById,
  addComment,
  updatePin,
  deletePin,
  createComment,
};

