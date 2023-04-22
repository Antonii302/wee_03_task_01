// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

// Importamos el módulo data-Library que contiene los datos de los autores
const data = require("../../data/data-library");

const { multipleSearchInObjectArray, singleSearchInObjectArray } = require('../../helpers/data.helper');

const serverResponse = (data) => {
  return {
    service: "authors",
    architecture: "microservices",
    length: data.length,
    data: data
  }
};

// Creamos la ruta para obtener todos los autores
router.get("/", (req, res) => {
  const authors = data.dataLibrary.authors;

  return res.send(serverResponse(authors));
});

// Creamos la ruta para obtener un autor por su id
router.get("/:authorid", (req, res) => {
  const authors = data.dataLibrary.authors;
  const authorParam = req.params.authorid;

  const authorById = singleSearchInObjectArray(authors, authorParam);

  return res.send(serverResponse(authorById));
  });

// Creamos la ruta para obtener autores por su nombre
router.get("/authorname/:authorname", (req, res) => {
  const authors = data.dataLibrary.authors;
  const authorParam = req.params.authorname;

  const authorsByName = multipleSearchInObjectArray(authors, authorParam);
  
  return res.send(serverResponse(authorsByName));
});

router.get('/countries/:country', (req, res) => {
  const authors = data.dataLibrary.authors;
  const authorParam = req.params.country;

  console.log(authorParam)
  const authorsByCountry = authors.filter((author) => {
    return author.country === authorParam
  });

  console.log(authorsByCountry);

  return res.send(serverResponse(authorsByCountry));
});

// Exportamos el objeto Router
module.exports = router;

/*
Este código utiliza el framework Express para crear un servicio web que devuelve información sobre autores. A continuación se detallan las acciones que se realizan línea por línea:

En la línea 2, se importa el paquete Express.
En la línea 5, se crea un objeto Router usando el método Router() de Express.
En la línea 8, se importa el módulo data-library que contiene los datos de los autores.
En la línea 11, se define una función logger que recibe un mensaje y lo muestra en la consola usando el método console.log().
En la línea 14, se define la ruta para obtener todos los autores. Cuando se hace una petición GET a la ruta raíz del servicio (/), se ejecuta la función que recibe el objeto Request (req) y el objeto Response (res). Dentro de la función, se crea un objeto response que contiene los datos de los autores y se muestra un mensaje en la consola usando la función logger. Finalmente, se envía la respuesta usando el método res.send().
En la línea 48, se define la ruta para obtener un autor por su id. Cuando se hace una petición GET a la ruta /:id del servicio, se ejecuta la función que recibe el objeto
*/
