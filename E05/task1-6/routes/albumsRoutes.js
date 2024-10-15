const express = require('express');
const albumsController = require('../controllers/albumsController.js');
const checkUserQuery = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/albums', albumsController.getAlbums);
//router.get('/', albumsController.getAllAlbums);
router.get('/albums/:id', albumsController.getAlbumById);
router.post('/albums', albumsController.createAlbum);
router.put('/albums/:id', albumsController.updateAlbum);
router.delete('/albums/:id', checkUserQuery, albumsController.deleteAlbum);

module.exports = router;

