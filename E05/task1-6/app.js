const express = require('express');
const connectDB = require('./db.js');

const albumsRoutes = require('./routes/albumsRoutes.js');
const albumsController = require('./controllers/albumsController.js');
const errorHandlerMiddleware = require('./middlewares/error-handler.js');
const notFoundMiddleware = require('./middlewares/not-found.js');


require('express-async-errors');

const app = express();
app.use(express.json()); //middleware for json

app.use('/api', albumsRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get('/', (req, res) => {
    res.send('Album');
});

app.get('/api/albums', albumsController.getAlbums);

//app.use('/api/albums', albumsRoutes);
connectDB();

module.exports = app;