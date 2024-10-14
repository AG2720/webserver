const Album = require('../models/Album');


exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching albums', error });
    } 
};

exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).send('Album not found');
        }

        res.json(album);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching album by ID', error });
    }
};

exports.createAlbum = async (req, res) => {
    const newAlbum = new Album({
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        tracks: req.body.tracks
    });
    try {
        const savedAlbum = await newAlbum.save();
        res.status(201).json(savedAlbum);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Error creating album', error });
        }
        res.status(500).json({ mesage: 'Error creating album', error });
    }
};


exports.updateAlbum = async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!updatedAlbum) {
            return res.status(404).send('Album not found');
        }
        res.json(updatedAlbum);
    } catch (error) {
        res.status(500).json({ message: 'Error updating album', error });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) {
            return res.status(404).send('Album not found');
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting album', error});
    }
};

//function saveAlbums() {
//   fs.writeFileSync(albumsFilePath, JSON.stringify({ albums }, null, 2));
//}
