module.exports = function () {
  var cache        = {}
  var map          = {}
  var size         = 0
  var cacheTimeout = 30 * 1000

  cache.put = function (uuid, data) {
    map[uuid] = { data: data, time: Date.now() }
    size++
  }

  cache.get = function (key) {
    return map[key] && map[key].data
  }

  cache.del = function(key) {
    var result = cache.get(key)
    if(typeof result !== 'undefined') size--
    delete map[key]
    return result
  }

  cache.cleanUp = function () {
    var keys    = Object.keys(map)
    var current = Date.now()
    for (var i = 0; i < keys.length; i++) {
      var time = map[keys[i]].time;
      if (current - time > cacheTimeout) cache.del(keys[i])
    }
  }

  cache.size = function() {
    return size
  }

  cache.reset = function () {
    map = {}
    size = 0
  }

  setInterval(cache.cleanUp.bind(cache), cacheTimeout)
  return cache
}
