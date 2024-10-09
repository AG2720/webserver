
const fs = require('fs');
const path = require('path');

const albumsFilePath = path.join(__dirname, '../data/albums.json');
const albumData = JSON.parse(fs.readFileSync(albumsFilePath));
let albums = albumData.albums;

exports.getAllAlbums = (req, res) => {
    res.json(albums);
};

exports.getAlbumById = (req, res) => {
    const albumId = parseInt(req.params.id);
    const album = albums.find(a => a.id === albumId);

    if (album) {
        res.json(album);
    } else {
        res.status(404).send('Album not found');
    }
};

exports.createAlbum = (req, res) => {
    const newAlbum = {
        id: albums.length +1,
        ...req.body
    };
    albums.push(newAlbum);
    saveAlbums();
    res.status(201).json(newAlbum);
};


exports.updateAlbum = (req, res) => {
    const albumId = parseInt(req.params.id);
    const albumIndex = albums.findIndex(a => a.id === albumId);

    if (albumIndex !== -1) {
        albums[albumIndex] = { id: albumId, ...req.body };
        saveAlbums();
        res.json(albums[albumIndex]);
    } else {
        res.status(404).send('Album not found');
    }
};

exports.deleteAlbum = (req, res) => {
    const albumId = parseInt(req.params.id);
    albums = albums.filter(a => a.id !== albumId);
    saveAlbums();
    res.status(204).send();
};

function saveAlbums() {
    fs.writeFileSync(albumsFilePath, JSON.stringify({ albums }, null, 2));
}
