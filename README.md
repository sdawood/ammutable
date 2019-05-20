master|develop|npm
---|---|---
[![Build Status](https://travis-ci.org/sdawood/rp.svg?branch=master)](https://travis-ci.org/sdawood/rp)|[![Build Status](https://travis-ci.org/sdawood/rp.svg?branch=develop)](https://travis-ci.org/sdawood/rp)|[![npm version](https://badge.fury.io/js/rp.svg)](https://badge.fury.io/js/rp)

# rp
```
    const {get, set, apply} = require('rp');
    const data = {
        user: {
            contact: {
                home: {
                    number: 11111
                }, mobile: {
                    number: 22222
                }
            },
            posts: [
                {content: 'Hello World!', likes: 10},
                {content: 'Goodbye World!', likes: 1}
            ]
        }
    };

    let result = get('$.user.contact.home.number')(data);
    // 11111

    result = get('$.user.contact["home","mobile"].number')(data);
    // {home: 11111, mobile: 22222}

    result = set('$.user.contact["home","mobile"].number')(99999)(data)

    // set is Immutable, data hasn't been modified, a new refernece is returned
    // lenses powering rp effectively behave like HAMT
    // They only create new objects for the nodes from root to path, the rest of the structure is shared.

    // {"user":{"contact":{"home":{"number":99999},"mobile":{"number":99999}},"posts":[{"content":"Hello World!","likes":10},{"content":"Goodbye World!","likes":1}]}}

    // number fields under both branches, namely 'home' AND 'mobile' are both set to value in the new object reference







```

## Possible use cases
- Redux Store Like Behavior around any JSON reference
- Immutable deep manipulation of JSON data

## Run the tests

  ```
  npm test
  ```

## FAQs

## Build Targets
Currently the following target build environments are configured for @babel/preset-env plugin
```
 "targets": {
   "node": 4.3,
   "browsers": ["last 10 versions", "ie >= 7"]
 }
```
In case this turns out to be not generous enough, more backward compatible babel transpilation targets would be added.

## Roadmap

- bigger and better
- rule'em all

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
