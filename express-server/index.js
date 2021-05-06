const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.static(path.join(__dirname, "client/build")));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// finish
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
