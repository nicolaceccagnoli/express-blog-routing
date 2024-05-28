const express = require('express');
const router = express.Router();

// Importo la logica del controller
const postsController = require('../controllers/posts.js');


router.get('/', postsController.index);

router.get('/create', postsController.create);

router.get('/:slug', postsController.show);

module.exports = router