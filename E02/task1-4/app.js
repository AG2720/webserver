const express = require('express');
const albumsRoutes = require('./routes/albumsRoutes');
const path = require('path');


const app = express();

app.use(express.json()); //middleware for json

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/albums', albumsRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

//module.exports = app;