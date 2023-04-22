const searchInObjectArray = (array, lookupValue) => {
    return array.filter((object) => {
        return Object.keys(object).some((key) => {
            return object[key].toString().includes(lookupValue);
        });
    });
}

module.exports = {
    searchInObjectArray
};