// @ts-check
/**
 * 
 * @param {Array<string>} array 
 * @returns {string}  returns a random element from the array
 */
function selectRandomElement(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

module.exports = selectRandomElement
