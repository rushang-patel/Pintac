const express = require('express');
const router = express.Router();

const pinController = require('../controllers/pins');

// Define routes for the pins

router.get('/', pinController.getAllPins);
router.get('/:id', pinController.getPinById);
router.post('/', pinController.createPin);
router.put('/:id', pinController.updatePin);
router.delete('/:id', pinController.deletePin);

module.exports = router;