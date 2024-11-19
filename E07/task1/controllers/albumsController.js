//albumsController.js
const Album = require('../models/Album.js');
const APIError = require('../errors/apierror.js');

exports.getAllAlbums = async (req, res) => {
        const albums = await Album.find().populate('owner', 'email role');
        res.json(albums); 
}; 

exports.getAlbumById = async (req, res) => {
        const album = await Album.findById(req.params.id).populate('owner', 'email role');
        if (!album) {
            throw new APIError('Album not found', 404);
        }
        res.json(album);
}; 

exports.createAlbum = async (req, res) => {
    const newAlbum = new Album({
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        tracks: req.body.tracks,
        owner: req.user.id
    });
    
    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
};

exports.updateAlbum = async (req, res) => {
        const album = await Album.findById(req.params.id);
        if (!album) {
           throw new APIError('Album not found', 404);
        }

        req.albumOwnerId = album.owner
        Object.assign(album, req.body)
        const updatedAlbum = await album.save()
        res.json(updatedAlbum);
};

exports.deleteAlbum = async (req, res) => {
        const album = await Album.findById(req.params.id);
        if (!album) {
            throw new APIError('Album not found', 404);
        }

        req.albumOwnerId = album.owner
        await album.deleteOne()

        res.status(200).json({ message: 'Deleted successuflly' })
};

exports.getAlbums = async (req, res) => {
        const { sortBy = 'artist', order = 'asc', minYear, maxYear, fields, artist, title } = req.query; //default sorting by artist
        const sortOrder = order === 'desc' ? -1 : 1;

        const filter = {};

        if (minYear) filter.year = { $gte: Number(minYear) };
        if (maxYear) filter.year = { ...filter.year, $lte: Number(maxYear) };

        if (artist) filter.artist = { $regex: artist, $options: 'i' }; // 'i' for case sensitive
        if (title) filter.title = { $regex: title, $options: 'i' };

        let query = Album.find(filter).sort({ [sortBy]: sortOrder });

        if (fields) {
            const selectedFields = fields.split(',').join(' ');
            //console.log('Selected fields:', selectedFields);
            query = query.select(`${selectedFields} -_id`);
        } else {
            query = query.select('-_id');
        }
        
        const albums = await query;
    
        res.json(albums);
};


