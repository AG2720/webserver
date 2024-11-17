//app.js
require('dotenv').config()
const express = require('express');
const connectDB = require('./db.js');

const albumsRoutes = require('./routes/albumsRoutes.js');
const registerRoutes = require('./routes/register.js')
const loginRoutes = require('./routes/login.js')

const errorHandlerMiddleware = require('./middlewares/error-handler.js');
const notFoundMiddleware = require('./middlewares/not-found.js');

require('express-async-errors');

const app = express();
app.use(express.json()); //middleware for json

app.use('/api', albumsRoutes)
app.use('/api/albums', albumsRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

connectDB();

module.exports = app;