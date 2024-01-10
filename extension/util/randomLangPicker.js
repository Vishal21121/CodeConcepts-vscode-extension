function selectRandomElement(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

module.exports = selectRandomElement
