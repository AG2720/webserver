//albumsRoutes.js
const express = require('express');
const albumsController = require('../controllers/albumsController.js');
const isAuthenticated = require('../middlewares/isAuthenticated.js');
const { isAdmin, isOwnerOrAdmin } = require('../middlewares/checkRole.js');
const User = require('../models/User.js');
const Album = require('../models/Album.js');

const router = express.Router();

router.get('/getAllAlbums', albumsController.getAlbums);

router.get('/', isAuthenticated, albumsController.getAlbums);

router.post('/', isAuthenticated, albumsController.createAlbum);
router.put('/:id', isAuthenticated, isOwnerOrAdmin, albumsController.updateAlbum);
router.delete('/:id', isAuthenticated, isOwnerOrAdmin, albumsController.deleteAlbum);

router.delete('/admin/user/:id', isAuthenticated, isAdmin, async (req, res) => {
    const userId = req.params.id
    const user = await User.findByIdAndDelete(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).end()
})

module.exports = router;

