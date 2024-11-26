//app.js
require('dotenv').config()
const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport')

const initializePassport = require('./passport-config')
const connectDB = require('./db.js');
const config = require('./utils/config')

const albumsRoutes = require('./routes/albumsRoutes.js');
const registerRoutes = require('./routes/register.js')
const loginRoutes = require('./routes/login.js')

const errorHandlerMiddleware = require('./middlewares/error-handler.js');
const notFoundMiddleware = require('./middlewares/not-found.js');

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

require('express-async-errors');

const app = express();

connectDB(config.MONGODB_URI);

app.use(express.json()); //middleware for json

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
   }))
   
   
initializePassport(passport);
app.use(passport.initialize())
app.use(passport.session())

async function startApolloServer() {
    const apolloServer = new ApolloServer({ typeDefs, resolvers })
    await apolloServer.start()
    app.use('/graphql', expressMiddleware(apolloServer))
    
    //routes
    app.use('/api/albums', albumsRoutes);
    app.use('/api/register', registerRoutes);
    app.use('/api/login', loginRoutes);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}

startApolloServer().then(() => {
    console.log('Apollo Server and express routes ready.')
})


module.exports = app;