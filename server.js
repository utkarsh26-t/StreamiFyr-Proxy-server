require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("cross-fetch");
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/searchSuggestions", (req, res) => {
  const { q } = req.query;
  const url = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${q}`;

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.get("/", (req, res) => {
  res.send("Hello from StreamiFyr");
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
