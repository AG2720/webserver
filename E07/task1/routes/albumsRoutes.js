//albumsRoutes.js
const express = require('express');
const albumsController = require('../controllers/albumsController.js');
const isAuthenticated = require('../middlewares/isAuthenticated.js');

const router = express.Router();

router.get('/getAllAlbums', albumsController.getAlbums);

router.get('/', isAuthenticated, albumsController.getAlbums);
router.post('/', isAuthenticated, albumsController.createAlbum);
router.put('/:id', isAuthenticated, albumsController.updateAlbum);
router.delete('/:id', isAuthenticated, albumsController.deleteAlbum);

module.exports = router;

