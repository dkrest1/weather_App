const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

// express object
const app = express();
const port = process.env.PORT || 3000;

const staticHtmlPage = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// using hbs
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
// get a response =
app.use(express.static(staticHtmlPage));
// the index page
app.get("", (req, res) => {
  res.render("index", {
    title: "WEATHER",
    footer: 2021,
  });
});
// About Page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Welcome to the About Page of Agency",
    footer: "2021",
  });
});

// Contact page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "You are welcome to the Help Page",
    footer: "2021",
  });
});

// json for the weather app
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  // request for geecode
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forcast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forcast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "404, page not found",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    footer: "2021",
    errorMessage: "The Article Page you are looking for cannot be found",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    footer: "2021",
    errorMessage: "the Page you are looking for cannot be found",
  });
});

app.listen(port, () => {
  console.log("server running on port 3000");
});
