const { Router } = require('express');

const { 
    getLanguages,
    getAuthorsByLanguage,
    getCountriesByLanguage,
    getBooksByLanguage
 } = require('../controllers/language.controller');

 const router = Router();

 router.get('/', getLanguages);

 router.get('/authors/:language', getAuthorsByLanguage);

 router.get('/countries/:language', getCountriesByLanguage);

 router.get('/books/:language', getBooksByLanguage);

 module.exports = router;