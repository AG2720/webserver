//app.js
require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const { PORT } = process.env

const sequelize = require('./db/postgres')

require('./models')
const vehicles = require('./routes/vehicles')
const users = require('./routes/users')
const errorHandler = require('./middleware/errorhandler')

// static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/api/vehicles', vehicles)
app.use('/api/users', users)

app.use(errorHandler)

const eraseDatabaseOnSync = process.env.ERASE || false

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  });
  

/*
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`) 
  })
})

*/

