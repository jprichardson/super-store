var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits
var util = require('./util')

// constructor
function SuperStore(obj) {
  if(!(this instanceof SuperStore)) return new SuperStore(obj)
  this.arr = obj || {}

  if (Array.isArray(this.arr))
    this.arr = util.arrayToObject(this.arr)

  EventEmitter.call(this)
}
inherits(SuperStore, EventEmitter)


SuperStore.prototype.clear = function() {
  this.arr.length = 0
  Object.keys(this.arr).forEach(function(key) {
    delete this.arr[key]
  },this)

  this.emit('change', {
    event: 'clear'
  })
}

SuperStore.prototype.get = function(key) {
  return this.arr[key]
}

SuperStore.prototype.set = function(key, value) {
  this.arr[key] = value
  this.emit('add', key, value)
  this.emit('change', {
    event: 'set',
    key: key,
    value: value
  })
}

SuperStore.prototype.remove = function(key) {
  var value = this.arr[key]
  delete this.arr[key]
  this.emit('remove', key, value)
  this.emit('change', {
    event: 'remove',
    key: key,
    value: value
  })
}

Object.defineProperty(SuperStore.prototype, 'length', {
  get: function() {
    return Object.keys(this.arr).length
  }
})

module.exports = SuperStore



