var expect   = require('expect.js')
var sinon    = require('sinon')
var Cache    = require('../src/index')
var clock
var key = 'key', value = 'value'

describe('cache tests', function () {
  beforeEach(function () {
    clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    clock.restore()
  })

  it('Cache should be initially empty', function() {
    var cache = Cache()
    expect(cache.size()).to.be(0)
  })

  it('Put object should be retreived', function() {
    var cache = Cache()
    var key1 = key + '_1', key2 = key + '_2'
    var value1 = value + '_1', value2 = value + '_2'
    cache.put(key1, value1)
    expect(cache.size()).to.be(1)
    cache.put(key2, value2)
    expect(cache.size()).to.be(2)
    expect(cache.get(key1)).to.be(value1)
    expect(cache.get(key2)).to.be(value2)
  })

  it('Deleted object should not be retrieved', function () {
    var cache = Cache()
    cache.put(key, value)
    expect(cache.get(key)).to.be.eql(value)
    expect(cache.del(key)).to.be.eql(value)
    expect(cache.get(key)).to.be.eql(undefined)
    expect(cache.del(key)).to.be.eql(undefined)
    expect(cache.size()).to.be(0)
  })

  it('Expired object should not be retreived', function () {
    var cache = Cache()
    cache.put(key, value)
    clock.tick(240000)
    expect(cache.get(key)).to.be(undefined)
    expect(cache.size()).to.be(0)
  })

  it('multiple expiry', function(){
    var cache = Cache()
    var uuids = []
    for (var i = 0; i < 10; i++) {
      var keyi = key + "_" + i
      cache.put(keyi, value)
      uuids.push(keyi)
    }
    clock.tick(240000)
    uuids.forEach(keyi => expect(cache.get(keyi)).to.be.eql(undefined))
    expect(cache.size()).to.be(0)
  })
})
