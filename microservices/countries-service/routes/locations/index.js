// Importamos la biblioteca Express
const express = require("express");

// Importamos el archivo data-library.js que contiene la información sobre los países.
const data = require("../../data/data-library");

// Creamos un router de Express
const router = express.Router();

const needle = require('needle');

const serverResponse = (data) => {
  return {
    service: "locations",
    architecture: "microservices",
    length: data.length,
    data: data
  }
};

// Creamos una ruta GET en la raíz del router que devuelve todos los países
router.get("/", (req, res) => {
  const countries = data.dataLibrary.countries;

  return res.send(serverResponse(countries));
});

router.get("/country/:languageCode", (req, res) => {
  const countries = data.dataLibrary.countries;
  const languageCodeparam = req.params.languageCode.toUpperCase();
  
  const searchResults = {};
  Object.entries(countries).filter((country) => {
    return country.includes(languageCodeparam)
  }).forEach((array) => {
    searchResults['languageCode'] = array[0];
    searchResults['country'] = array[1]['name'];
  });
  
  const response = {
    service: "countries",
    architecture: "microservices",
    length: searchResults.length,
    data: searchResults
  };

  return res.send(response);
});

router.get("/languages/:languageCode", (req, res) => {
  const lookupValue = req.params.languageCode;

  const countries = data.dataLibrary.countries;

  const searchResults = Object.entries(countries).filter((country) => {
    const countryDetails = country[1];
    return countryDetails['languages'].includes(lookupValue);
  });

  const response = {
    service: "countries",
    architecture: "microservices",
    length: searchResults.length,
    data: searchResults
  };

  return res.send(response);
});

router.get('/capital/:capital', (req, res) => {
  const countries = data.dataLibrary.countries;
  const countriesParam = req.params.capital;

  const countriesByCapital = Object.entries(countries).find((country) => {
    const countryDetails = country[1];
    return countryDetails['capital'] === countriesParam;
  });


  return res.send(serverResponse(countriesByCapital));
});

router.get('/authors/:capital', async (req, res) => {
  const countries = data.dataLibrary.countries;
  const countriesParam = req.params.capital;

  const countriesByCapital = Object.entries(countries).find((country) => {
    const countryDetails = country[1];
    return countryDetails['capital'] === countriesParam;
  });

  if (countriesByCapital.length === 0) {
    return res.status().json({
      message: 'Don\'t found'
    });
  }

  const country = countriesByCapital[1]['name'];

  const authorsRequest = await needle('get', `http://localhost:3000/api/v2/authors/countries/${country}`);
  const authorsByCapital = authorsRequest.body.data;

  return res.send(serverResponse(authorsByCapital));
});

router.get('/books/:capital', async (req, res) => {
  const countries = data.dataLibrary.countries;
  const countriesParam = req.params.capital;

  const countriesByCapital = Object.entries(countries).find((country) => {
    const countryDetails = country[1];
    return countryDetails['capital'] === countriesParam;
  });

  if (countriesByCapital.length === 0) {
    return res.status().json({
      message: 'Don\'t found'
    });
  }

  const country = countriesByCapital[1]['name'];

  const booksRequest = await needle('get', `http://localhost:4000/api/v2/books/countries/${country}`);
  const booksByCapital = booksRequest.body.data;

  return res.send(serverResponse(booksByCapital));
});

// Exportamos el router
module.exports = router;