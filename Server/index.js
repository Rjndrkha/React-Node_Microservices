const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const post = {};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/posts", (req, res) => {
  res.json(Object.values(post));
});

app.post("/posts", (req, res) => {
  const id = Math.floor(Math.random() * 999999);
  const { title } = req.body;
  post[id] = {
    id,
    title,
  };
  res.status(201).json(post[id]);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.get("/todos", (req, res) => {
  const data = axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      res.json(response.data);
    });
});
