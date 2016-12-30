module.exports = function () {
  var cache     = {}
  var map       = {}
  var size      = 0
  cache.timeout = 30 * 1000

  cache.put = function (key, data) {
    map[key] = { data: data, time: Date.now() }
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

  cache.size = function() {
    return size
  }

  cache.reset = function () {
    map = {}
    size = 0
  }

  var cleanUp = function () {
    var keys    = Object.keys(map)
    var current = Date.now()

    for (var i = 0; i < keys.length; i++) {
      var time = map[keys[i]].time;
      if (current - time > cache.timeout) cache.del(keys[i])
    }
  }

  setInterval(cleanUp, cache.timeout)

  return cache
}
