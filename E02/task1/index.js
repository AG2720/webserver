const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); //middleware for json

const albumData = JSON.parse(fs.readFileSync('albums.json'));
let albums = albumData.albums;

app.get('/albums', (req, res) => {
    res.json(albums);
});

app.get('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id);
    const album = albums.find(a => a.id === albumId);

    if (album) {
        res.json(album);
    } else {
        res.status(404).send('Album not found');
    }
});

app.post('/albums', (req, res) => {
    const newAlbum = {
        id: albums.length +1,
        ...req.body
    };
    albums.push(newAlbum);
    res.status(201).json(newAlbum);
});


app.put('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id);
    const albumIndex = albums.findIndex(a => a.id === albumId);

    if (albumIndex !== -1) {
        albums[albumIndex] = { id: albumId, ...req.body };
        res.json(albums[albumIndex]);
    } else {
        res.status(404).send('Album not found');
    }
});

app.delete('/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id);
    albums = albums.filter(a => a.id !== albumId);

    res.status(204).send();
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
