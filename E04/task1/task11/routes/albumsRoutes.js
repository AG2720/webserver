const express = require('express');
const albumsController = require('../controllers/albumsController.js');
const checkUserQuery = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/', albumsController.getAllAlbums);
router.get('/:id', albumsController.getAlbumById);
router.post('/', albumsController.createAlbum);
router.put('/:id', albumsController.updateAlbum);
router.delete('/:id', checkUserQuery, albumsController.deleteAlbum);

module.exports = router;

