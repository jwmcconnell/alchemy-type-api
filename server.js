const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
// const knex = require("knex");
// const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("alchemy type is working");
});

app.listen(3000, () => {
  console.log(`running on port 3000`);
});
