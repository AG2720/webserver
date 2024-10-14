const express = require('express');
const connectDB = require('./db');
//const albumsRoutes = require('./routes/albumsRoutes');
//const path = require('path');


const app = express();

app.use(express.json()); //middleware for json

//app.use(express.static(path.join(__dirname, 'public')));
const albumsRoutes = require('./routes/albumsRoutes');

app.get('/', (req, res) => {
    res.send('Album');
});

app.use('/api/albums', albumsRoutes);
connectDB();
//const port = 3000;
//app.listen(port, () => {
//    console.log(`Server running on http://localhost:${port}`);
//});

module.exports = app;