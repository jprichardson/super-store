
// we need to do this because JSON.stringify(array)
// will leave out the key / value pairs
function arrayToObject(arr) {
  return arr.reduce(function(o, v, i) {
    o[i] = v
    return o
  }, {})
}

module.exports = {
  arrayToObject: arrayToObject
}
