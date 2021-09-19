const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send({ test: "test" });
});

app.listen(PORT, () => {
  console.log(`[*] Listen on http://localhost:${PORT}`);
});