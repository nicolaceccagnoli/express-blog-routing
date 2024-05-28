const express = require('express');
const router = express.Router();

// Importo la logica del controller
const postsController = require('../controllers/posts.js');


router.get('/', postsController.index);

router.get('/create', postsController.create);

router.get('/:slug', postsController.show);

router.get('/:slug/download', postsController.download);


module.exports = router