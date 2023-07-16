const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pins');

// Get all pins
router.get('/', pinController.getAllPins);

// Render the new pin form
router.get('/new', pinController.renderNewPinForm);

// Create a new pin
router.post('/', pinController.createPin);

// Get a pin by ID
router.get('/:id', pinController.getPinById);

// Update a pin by ID
router.put('/:id', pinController.updatePin);

// Delete a pin by ID
router.delete('/:id', pinController.deletePin);


const commentController = require('../controllers/pins');

// Define routes for comments

// Create a new comment
router.post('/pins', commentController.createComment);


module.exports = router;
