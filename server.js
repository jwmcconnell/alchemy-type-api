const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const register = require("./controllers/register");
const login = require("./controllers/login");
const profile = require("./controllers/profile");
const passage = require("./controllers/passage");
const auth = require("./middlewares/authorization");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
});

// const db = knex({
//   client: "pg",
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
//   }
// });

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("alchemy type is working");
});

app.post("/login", (req, res) => {
  login.handleAuth(req, res, db, bcrypt, jwt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.post("/passages", auth.requireAuth, (req, res) => {
  passage.handleAddPassage(req, res, db);
});
app.get("/passages/:id", auth.requireAuth, (req, res) => {
  if (req.params.id) {
    passage.handleGetPassage(req, res, db);
  } else {
    passage.handleGetPassages(req, res, db);
  }
});

app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
