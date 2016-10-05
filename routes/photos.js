const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const PhotosController = require('../controllers/PhotosController');

router.get('/', PhotosController.list);
router.get('/:id', PhotosController.show);
router.post('/', PhotosController.create);

module.exports = router;
