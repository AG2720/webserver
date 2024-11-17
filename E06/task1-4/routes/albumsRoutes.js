//albumsRoutes.js
const express = require('express');
const albumsController = require('../controllers/albumsController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/getAllAlbums', albumsController.getAlbums);

router.post('/albums', authMiddleware, albumsController.createAlbum);
router.put('/albums/:id', authMiddleware, albumsController.updateAlbum);
router.delete('/albums/:id', authMiddleware, albumsController.deleteAlbum);

module.exports = router;

