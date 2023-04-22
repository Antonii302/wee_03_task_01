const multipleSearchInObjectArray = (array, lookupValue) => {
    return array.filter((object) => {
        return Object.keys(object).some((key) => {
            return object[key].toString().includes(lookupValue);
        });
    });
}

const singleSearchInObjectArray = (array, lookupValue) => {
    const temporaryArray = [];

    temporaryArray.push(array.find((object) => {
        return Object.keys(object).some((key) => {
            return object[key].toString().includes(lookupValue);
        });
    }));

    return temporaryArray
}

module.exports = {
    multipleSearchInObjectArray,
    singleSearchInObjectArray
};