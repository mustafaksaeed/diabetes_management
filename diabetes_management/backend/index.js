import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const api = process.env.APIKEY;
const port = process.env.PORT;

const app = express();

app.get("/health", (req, res) => {
  res.send("OK works");
});

app.use(cors());

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.get("/foodsearch", function (req, res) {
  const query = req.query.searchquery;

  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api}&query=${query}`;

  async function search(retries = 3) {
    if (retries === 0) res.status(100).send("TRY AGAIN LATER....");

    const response = await fetch(url);

    if (response.status !== 200) {
      await sleep(1000);
      return search(retries - 1);
    }
    const data = await response.json();
    res.json(data);
    console.log("retries", retries);
  }
  search();
});

app.listen(port, (req, res) => {
  console.log("server listening on port:", port);
});
