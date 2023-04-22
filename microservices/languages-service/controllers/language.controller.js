const needle = require('needle');

const { globalLanguages } = require('../models/language.model');

const { searchInObjectArray } = require('../helpers/data.helper');

const serverResponse = (data) => {
    return {
      service: "languages",
      architecture: "microservices",
      length: data.length,
      data: data
    }
};

const getLanguages = (req, res) => {  
    return res.send(serverResponse(globalLanguages));
};

const getAuthorsByLanguage = async (req, res) => {
    const languageParam = req.params.language;

    const [{ languageCode }] = globalLanguages.filter((object) => {
        return (object.languageCode === languageParam) || (object.regionalLanguage.some((regionLanguage) => regionLanguage === languageParam));
    });

    const countriesRequest = await needle('get', `http://localhost:8080/api/v2/countries/country/${languageCode}`);
    const countries = countriesRequest.body.data;

    const { country } = countries;

    const authorsRequest = await needle('get', `http://localhost:8080/api/v2/authors/countries/${country}`);
    const authorsByLanguage = authorsRequest.body.data;
    
    return res.send(serverResponse(authorsByLanguage));
};

const getCountriesByLanguage = async (req, res) => {
    const languageParam = req.params.language;
    
    const [{ languageCode }] = globalLanguages.filter((object) => {
        return (object.languageCode === languageParam) || (object.regionalLanguage.some((regionLanguage) => regionLanguage === languageParam));
    });

    const countriesRequest = await needle('get', `http://localhost:8080/api/v2/countries/languages/${languageCode}`);
    const countriesByLanguage = countriesRequest.body.data;

    return res.send(serverResponse(countriesByLanguage));
};

const getBooksByLanguage = async (req, res) => {
    const languageParam = req.params.language;

    const [{ languageCode }] = globalLanguages.filter((object) => {
        return (object.languageCode === languageParam) || (object.regionalLanguage.some((regionLanguage) => regionLanguage === languageParam));
    });

    const countriesRequest = await needle('get', `http://localhost:8080/api/v2/countries/languages/${languageCode}`);
    const countriesByLanguage = countriesRequest.body.data;
    
    const countries = []
    countriesByLanguage.forEach((object) => {
        countries.push(object[1]['name'])
    });

    const booksRequest = await needle('get', `http://localhost:8080/api/v2/books/countries/${countries}`);
    const booksByLanguage = booksRequest.body.data;

    return res.send(serverResponse(booksByLanguage));
};

module.exports = {
    getLanguages,
    getAuthorsByLanguage,
    getCountriesByLanguage,
    getBooksByLanguage
};