const Album = require('../models/Album')


function isAdmin(req, res, next){
    if (req.user && req.user.role === 'admin'){
        return next()
    }
    return res.status(403).json({ message: 'Access denied: admins only' })
}

const isOwnerOrAdmin = async (req, res, next) => {
    try {
        const albumId = req.params.id
        const album = await Album.findById(albumId)

        if(!album) {
            return res.status(404).json({ message: 'Album not found' })
        }

        const userId = req.user ? req.user._id.toString() : null
        const ownerId = album.owner ? album.owner.toString() : null
        const isAdmin = req.user?.role === 'admin'

        if (isAdmin || userId === ownerId) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this album' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error})
    }
}


module.exports = { isAdmin, isOwnerOrAdmin}