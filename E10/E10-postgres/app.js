require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const { PORT } = process.env;

const sequelize = require("./db/postgres");

const vehicles = require("./routes/vehicles");
const userRoutes = require("./routes/user");
const errorHandler = require("./middleware/errorhandler");

require("./models/index");

// static assets
app.use(express.static("./public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/api/vehicles", vehicles);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const eraseDatabaseOnSync = process.env.ERASE || false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
});
