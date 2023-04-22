const fileSystem = require('fs');

const path = require('path');
const pathToCsvFile = '../database/language-codes.csv';
const filePath = path.join(__dirname, pathToCsvFile);

const document = fileSystem.readFileSync(filePath, { encoding: 'utf-8' });
const documentLines = document.split('\n');

const globalLanguages = [];

documentLines.forEach((documentLine) => {
    const temporaryObject = {};

    const documentData = documentLine.toString().trim().split(',');
    const languageCode = documentData.shift();

    const regionalLanguage = documentData.toString().split(';');

    temporaryObject['languageCode'] = languageCode;
    temporaryObject['regionalLanguage'] = regionalLanguage;

    globalLanguages.push(temporaryObject);
});

JSON.stringify(globalLanguages);

module.exports = { globalLanguages };