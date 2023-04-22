const express = require("express"); // importa Express
const router = express.Router(); // crea un nuevo enrutador de Express
const data = require("../../data/data-library"); // importa los datos de data-library

const needle = require('needle');

const serverResponse = (data) => {
  return {
    service: "books",
    architecture: "microservices",
    length: data.length,
    data: data
  }
};

// define un controlador para la ruta raíz ("/")
router.get("/", (req, res) => {
  const books = data.dataLibrary.books;
  
  return res.send(serverResponse(books));
});

// define un controlador para la ruta "/title/:title"
router.get("/:title", (req, res) => {
  const books = data.dataLibrary.books;
  const titleParam = req.params.title;

  const booksByTitles = books.filter((book) => {
    return book.title.includes(titleParam);
  });

  console.log(booksByTitles)
  
  return res.send(serverResponse(booksByTitles));
});

router.get('/authorid/:authorid', (req, res) => {
  const books = data.dataLibrary.books;
  const authorParam = req.params.authorid;

  const author = needle('get', `http://localhost:8080/api/v2/authors/${authorParam}`);

  const booksByAuthor = books.find((book) => {
    return book.authorid.toString() === authorParam;
  });

  return res.send(serverResponse(booksByAuthor));
});

router.get(('/year/:from/:to'), (req, res) => {
  const books = data.dataLibrary.books;
  const fromParam = req.params.from;
  const toParam = req.params.to;

  const booksByYear = books.filter((book) => {
    return (book.year >= fromParam) && (book.year <= toParam);
  });

  return res.send(serverResponse(booksByYear));
});

router.get("/countries/:countries", (req, res) => {
  const books = data.dataLibrary.books;
  const countriesParam = req.params.countries.split(',');

  console.log(countriesParam);
  const booksByCountries = [];
  countriesParam.forEach((country) => {
    booksByCountries.push(books.filter((book) => {
      return book.distributedCountries.includes(country)
    }));
  });

  return res.send(serverResponse(booksByCountries));
});

module.exports = router; // exporta el enrutador de Express para su uso en otras partes de la aplicación

/*
Este código es un ejemplo de cómo crear una API de servicios utilizando Express y un enrutador. El enrutador define dos rutas: una para obtener todos los libros y otra para obtener libros por título. También utiliza una función simple de registro para registrar mensajes en los registros.
*/
