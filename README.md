# ephemeral-cache
Cache that expires entries with timeout

# Usage

### Instantiate with default 30s timeout
```javascript
var cache = require('ephemeral-cache')
```

### Change timeout to 30 minutes
```javascript
cache.timeout = 30 * 60 * 1000
```

### Main Operations

```javascript

var value0 = cache.get('key') // returns undefined for non-existent keys

cache.put('key', 'value')

var value1 = cache.get('key') // returns 'value'

var value2 = cache.del('key') // returns 'value' if deleted key exists

var value3 = cache.get('key') // returns undefined for deleted keys

var size = cache.size()
```

### Reset to clean state; delete everything

```javascript
cache.reset()
```
### Notes

Timeout does not restart on get operation. Explicitly put again if needed.

```javascript

cache.put('key', 'value')

var value = cache.get('key')

cache.put('key', value) // restart timer
```
