const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
// const knex = require("knex");
// const jwt = require("jsonwebtoken");
const morgan = require("morgan");

// const register = require("./controllers/register");
// const login = require("./controllers/login");
// const profile = require("./controllers/profile");
// const auth = require("./middlewares/authorization");

// const db = knex({
//   client: "pg",
//   connection: process.env.POSTGRES_URI
// });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("alchemy type is working");
});

// app.post("/login", (req, res) => {
//   login.handleAuth(req, res, db, bcrypt, jwt);
// });
// app.post("/register", (req, res) => {
//   register.handleRegister(req, res, db, bcrypt);
// });
// app.get("/profile/:id", auth.requireAuth, (req, res) => {
//   profile.handleProfileGet(req, res, db);
// });

app.listen(3000, () => {
  console.log(`running on port 3000`);
});
