const express = require("express");
const fs = require("fs");
const PORT = 1234;
const app = express();

let { airports } = JSON.parse(fs.readFileSync("./airports.json", "utf8"));

airports = airports.map(({ country, ...airport }) => {
  return {
    city: airport.display_name,
    country: country.display_name,
    countryCode: country.code,
    airportCode: airport.code
  };
});
const { airportInfo } = JSON.parse(
  fs.readFileSync("./airportInfo.json", "utf8")
);

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function includesIgnoreCase(a = "", b = "") {
  return a.toLowerCase().includes(b.toLowerCase());
}

app.get("/airports", (req, res) => {
  const { search } = req.query;
  res.send(
    JSON.stringify(
      airports.filter(({ city, country }) => {
        return (
          includesIgnoreCase(city, search) ||
          includesIgnoreCase(country, search)
        );
      })
    )
  );
});

app.get("/airports/:code", (req, res) => {
  const { code } = req.params;
  console.log(code);
  const airport = airportInfo[code];
  setTimeout(() => {
    if (airport) {
      res.send(JSON.stringify(airport));
    } else {
      res.sendStatus(404);
    }
  }, 1000);
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
