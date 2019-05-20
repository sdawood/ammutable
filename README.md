master|develop|npm
---|---|---
[![Build Status](https://travis-ci.org/sdawood/rp.svg?branch=master)](https://travis-ci.org/sdawood/rp)|[![Build Status](https://travis-ci.org/sdawood/rp.svg?branch=develop)](https://travis-ci.org/sdawood/rp)|[![npm version](https://badge.fury.io/js/rp.svg)](https://badge.fury.io/js/rp)

# rp
```
describe('scenario: unprism', () => {
    it('works: ', done => {
        const journal = new BehaviorSubject({value: series});
        journal.subscribe(
            journalEntry => show({journalEntry}),
            error => show('Error:', error),
            () => show(`ALL-DONE`)
        );

        journal.pipe(take(4), toArray()).subscribe(
            journal => {
                try {
                    // expect(journal[1].value.episodes.EP2.EP21.start.place).toEqual('La La');
                    // expect(journal[2].value.episodes.EP3.EP33.start.place).toEqual('LAND');

                    done();
                } catch (error) {
                    done.fail(error);
                }
            },
            error => done.fail(error),
            () => /*journalLog.end(`@clicks: ${clicks}`),*/ show('ALL-DONE')
        );

        const resultNodes = Unprism(journal, {labels: ['Unprism-Test']})(
            {
                nodes: [
                    {path: `$.episodes.EP2.EP21.start.place`, value: 'La La'},
                    {path: `$.episodes.EP3.EP33.start.place`, value: 'LAND'}
                ]
            }
        );

        // expect(resultNodes.value).toEqual({});
        expect(resultNodes.value.episodes.EP2.EP21.start.place).toEqual('La La');
        expect(resultNodes.value.episodes.EP3.EP33.start.place).toEqual('LAND');

        expect(resultNodes.multiWriter.___included()).toEqual(['$.episodes.EP2.EP21.start.place', '$.episodes.EP3.EP33.start.place']);
        const {value} = resultNodes.multiWriter.updates(['lA lA', 'land']);
        expect(value.episodes.EP2.EP21.start.place).toEqual('lA lA');
        expect(value.episodes.EP3.EP33.start.place).toEqual('land');

        const updates = resultNodes.multiWriter.updates();
        expect(updates).toEqual(['lA lA', 'land']);

    });
});
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
