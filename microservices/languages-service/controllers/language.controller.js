const needle = require('needle');

const { globalLanguages } = require('../models/language.model');

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

    const countriesRequest = await needle('get', `http://countries:5000/api/v2/countries/country/${languageCode}`);
    const countries = await countriesRequest.body.data;

    const { country } = countries;

    const authorsRequest = await needle('get', `http://authors:3000/api/v2/authors/countries/${country}`);
    const authorsByLanguage = await authorsRequest.body.data;
    
    return res.send(serverResponse(authorsByLanguage));
};

const getCountriesByLanguage = async (req, res) => {
    const languageParam = req.params.language;
    
    const [{ languageCode }] = globalLanguages.filter((object) => {
        return (object.languageCode === languageParam) || (object.regionalLanguage.some((regionLanguage) => regionLanguage === languageParam));
    });

    const countriesRequest = await needle('get', `http://countries:5000/api/v2/countries/languages/${languageCode}`);
    const countriesByLanguage = await countriesRequest.body.data;

    return res.send(serverResponse(countriesByLanguage));
};

const getBooksByLanguage = async (req, res) => {
    const languageParam = req.params.language;

    const [{ languageCode }] = globalLanguages.filter((object) => {
        return (object.languageCode === languageParam) || (object.regionalLanguage.some((regionLanguage) => regionLanguage === languageParam));
    });

    const countriesRequest = await needle('get', `http://countries:5000/api/v2/countries/languages/${languageCode}`);
    const countriesByLanguage = await countriesRequest.body.data;
    
    const countries = []
    countriesByLanguage.forEach((object) => {
        countries.push(object[1]['name'])
    });

    const booksRequest = await needle('get', `http://books:4000/api/v2/books/countries/${countries}`);
    const booksByLanguage = await booksRequest.body.data;

    return res.send(serverResponse(booksByLanguage));
};

module.exports = {
    getLanguages,
    getAuthorsByLanguage,
    getCountriesByLanguage,
    getBooksByLanguage
};