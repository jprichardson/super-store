var assert = require('assert')
var store = require('../')

describe('super-store', function() {
  describe('constructor', function() {
    it('should create the object', function() {
      var ss = store()
      assert(ss)
    })

    describe('> when object passed in', function() {
      it('should create the object', function() {
        var ss = store({name: 'JP'})
        assert.equal(ss.length, 1)
      })
    })

    describe('> when array passed in', function() {
      it('should create the object', function() {
        var ss = store(['a', 'b', 'c'])
        assert.equal(ss.length, 3)
      })
    })
  })

  describe('set', function() {
    it('should set an item', function(done) {
      var ss = store()
      
      ss.on('change', function(data) {
        assert.equal(data.event, 'set')
        assert.equal(data.key, 'name')
        assert.deepEqual(data.value, {food: 'pizza'})
        done()
      })

      ss.on('add', function(key, val) {
        assert.equal(key, 'name')
        assert.deepEqual(val, {food: 'pizza'})
      })

      assert.equal(ss.length, 0)
      ss.set('name', {food: 'pizza'})
      assert.equal(ss.length, 1)
    })
  })

  describe('get', function() {
    it('should get an item', function() {
      var ss = store()

      assert.equal(ss.get('name'), void 0)
      ss.set('name', 'JP')
      assert.equal(ss.get('name'), 'JP')
    })
  })

  describe('remove', function() {
    it('should remove the item', function(done) {
      var ss = store({
        jp: 'likes programming',
        chris: 'likes pizza'
      })

      assert.equal(ss.length, 2)

      ss.on('change', function(data) {
        assert.equal(data.event, 'remove')
        assert.equal(data.key, 'jp')
        assert.equal(data.value, 'likes programming')

        assert.equal(ss.length, 1)

        done()
      })

      ss.on('remove', function(key, val) {
        assert.equal(key, 'jp')
        assert.equal(val, 'likes programming')
      })

      ss.remove('jp')
    })
  })

  describe('> has', function() {
    it('should return true if it contains the item', function() {
      
    })
  })
})

