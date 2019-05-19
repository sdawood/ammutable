// const {has, returns} = require('shades');
const F = require('functional-pipelines');

const {sortByPath} = require('../../utils/sortByPath');
const {MultiWriter} = require('./unknown-many');
const {BehaviorSubject} = require('rxjs');
const {take, toArray} = require('rxjs/operators');

const {show, aLine} = require('../../utils/trace');

describe('It should collect deep paths from existing stable-shaped-document (by design)', () => {
    it('works', done => {
        const MiniSeries = require('./mini-series.data');

        // const nodes = jp.nodes(MiniSeries, '$..*');
        // const pathSheet = nodes.map(({path, value}) => ([jp.stringify(path), value]));

        const pathSheet = require('./path-sheet.data');
        const pathList = [
            // '$.sequence',
            // '$.episodes',
            // '$.sequence[0]',
            '$.sequence[1]',
            // '$.sequence[2]',
            // '$.episodes.EP1',
            // '$.episodes.EP2',
            // '$.episodes.EP3',
            // '$.episodes.EP1.sequence',
            // '$.episodes.EP1.EP11',
            // '$.episodes.EP1.EP12',
            // '$.episodes.EP1.EP13',
            // '$.episodes.EP1.sequence[0]',
            '$.episodes.EP1.sequence[1]',
            // '$.episodes.EP1.sequence[2]',
            // '$.episodes.EP1.EP11.start',
            '$.episodes.EP1.EP11.start.place',
            '$.episodes.EP1.EP11.start.time',
            // '$.episodes.EP1.EP12.start',
            // '$.episodes.EP1.EP12.start.place',
            // '$.episodes.EP1.EP12.start.time',
            // '$.episodes.EP1.EP13.start',
            // '$.episodes.EP1.EP13.start.place',
            // '$.episodes.EP1.EP13.start.time',
            // '$.episodes.EP2.sequence',
            // '$.episodes.EP2.EP21',
            // '$.episodes.EP2.EP22',
            // '$.episodes.EP2.EP23',
            // '$.episodes.EP2.sequence[0]',
            // '$.episodes.EP2.sequence[1]',
            // '$.episodes.EP2.sequence[2]',
            // '$.episodes.EP2.EP21.start',
            // '$.episodes.EP2.EP21.start.place',
            // '$.episodes.EP2.EP21.start.time',
            // '$.episodes.EP2.EP22.start',
            // '$.episodes.EP2.EP22.start.place',
            // '$.episodes.EP2.EP22.start.time',
            // '$.episodes.EP2.EP23.start',
            // '$.episodes.EP2.EP23.start.place',
            // '$.episodes.EP2.EP23.start.time',
            // '$.episodes.EP3.sequence',
            // '$.episodes.EP3.EP31',
            // '$.episodes.EP3.EP32',
            // '$.episodes.EP3.EP33',
            // '$.episodes.EP3.sequence[0]',
            // '$.episodes.EP3.sequence[1]',
            // '$.episodes.EP3.sequence[2]',
            // '$.episodes.EP3.EP31.start',
            '$.episodes.EP3.EP31.start.place',
            '$.episodes.EP3.EP31.start.time',
            // '$.episodes.EP3.EP32.start',
            '$.episodes.EP3.EP32.start.place',
            '$.episodes.EP3.EP32.start.time',
            // '$.episodes.EP3.EP33.start',
            '$.episodes.EP3.EP33.start.place',
            '$.episodes.EP3.EP33.start.time'
        ];

        const journal = new BehaviorSubject({value: MiniSeries});
        let clicks = 0;
        const fs = require('fs');
        // const journalLog = fs.createWriteStream('./journal-expected-log.json');

        journal.subscribe(entry => {
                show('+JournalEntry', ++clicks, entry, entry.gets ? entry.gets('$.___marker.version') : 'NO .gets')
            },
            error => console.error(error)
        );


        journal.pipe(take(21), toArray()).subscribe(
            journal => {
                try {
                    expect(journal.map(({gets, sets, ...rest}) => rest)).toEqual(require('./journal-expected-stringified'));
                    // journalLog.write(JSON.stringify(journal, null, 0) + '\n', undefined, done);
                    done();
                } catch (error) {
                    done.fail(error);
                }
            },
            error => done.fail(error),
            () => /*journalLog.end(`@clicks: ${clicks}`),*/ show('ALL-DONE')
        );


        const multiCatcher = MultiWriter(journal)(pathList);

        const v1Values = ["EP2", "EP12", "EP11-Place", "EP11 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)", "EP31-Place", "EP31 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)", "EP32-Place", "EP32 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)", "EP33-Place", "EP33 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)"];

        expect(multiCatcher.updates()).toEqual(v1Values);

        const notAvailables = [];
        notAvailables.length = pathList.length;
        notAvailables.fill(('NOT-AVAILABLE'));
        const revisions = multiCatcher.updates(notAvailables);
        expect(revisions).toEqual({
                "___marker": {"labels": ["#JournalWriter.v0.0.1"], "version": 11},
                "action": "set",
                "gets": expect.any(Function),
                "path": "$.episodes.EP1.EP11.start.place",
                "sets": expect.any(Function),
                "value": {
                    "episodes": {
                        "EP1": {
                            "EP11": {"start": {"place": "NOT-AVAILABLE", "time": "NOT-AVAILABLE"}},
                            "EP12": {
                                "start": {
                                    "place": "EP12-Place",
                                    "time": "EP12 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)"
                                }
                            },
                            "EP13": {
                                "start": {
                                    "place": "EP13-Place",
                                    "time": "EP13 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)"
                                }
                            },
                            "sequence": ["EP11", "NOT-AVAILABLE", "EP13"]
                        },
                        "EP2": {
                            "EP21": {
                                "start": {
                                    "place": "EP21-Place",
                                    "time": "EP21 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)"
                                }
                            },
                            "EP22": {
                                "start": {
                                    "place": "EP22-Place",
                                    "time": "EP22 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)"
                                }
                            },
                            "EP23": {
                                "start": {
                                    "place": "EP23-Place",
                                    "time": "EP23 @ Wed May 15 2019 23:48:27 GMT+0200 (EET)"
                                }
                            },
                            "sequence": ["EP21", "EP22", "EP23"]
                        },
                        "EP3": {
                            "EP31": {"start": {"place": "NOT-AVAILABLE", "time": "NOT-AVAILABLE"}},
                            "EP32": {"start": {"place": "NOT-AVAILABLE", "time": "NOT-AVAILABLE"}},
                            "EP33": {"start": {"place": "NOT-AVAILABLE", "time": "NOT-AVAILABLE"}},
                            "sequence": ["EP31", "EP32", "EP33"]
                        }
                    }, "sequence": ["EP1", "NOT-AVAILABLE", "EP3"]
                }
            }
        );

        multiCatcher.updates(v1Values);
        expect(multiCatcher.updates()).toEqual(v1Values);
    });

});

///// @TODO: LEGACY CODE AHEAD //////

describe.skip('scenario: shades', () => {
    it('inspiration:: should handle binding', () => {
        const base = {
            IDTag() {
                return this.tag;
            }
        };

        const extended = {
            ...base,
            tag: 'hi'
        };

        expect(has({IDTag: returns('hi')})).toBeTruthy();
    });

    it('property accessors get/set do not survive shallow copying and turn into normal attributes', () => {
        const base = {
            get ['virtual']() {
                console.log('GET-ATTR')
                return `Oh - ${this.tag}`;
            }
        };

        const extended = {
            ...base,
            tag: 'hi'
        };

        expect(base.virtual).toEqual('Oh - undefined');
        expect(extended.virtual).toEqual('Oh - undefined');

        base.tag = 'Bye'; // old school patching
        expect(base.virtual).toEqual('Oh - Bye');
        expect(extended.virtual).toEqual('Oh - undefined');
        // getter and setters don't survive the ...spread operator
    });

    it('should handle first-level (shallow) virtual accessors with context this', () => {
        const forKey = key => ({
            [`${key}`](newValue) {
                if (newValue === undefined) {
                    console.log('GET-ATTR');
                    return `Oh - ${this.tag}`;
                } else {
                    this.tag = newValue;
                    console.log('SET-ATTR');
                    return newValue;
                }
            }
        });

        const base = forKey('virtual');
        expect(base.virtual()).toEqual('Oh - undefined');

        const extended = {
            ...base,
            tag: 'hi',
            childAttr: 'protected against access from base references'
        };

        expect(base.virtual()).toEqual('Oh - undefined');
        expect(extended.virtual()).toEqual('Oh - hi');

        base.virtual('Bye');
        expect(base.virtual()).toEqual('Oh - Bye');
        expect(extended.virtual()).toEqual('Oh - hi');
    });

    it('should handle first-level (shallow) virtual accessors with caller reference this', () => {
        const forKey = function (key) {
            return {
                [`${key}`](newValue) {
                    if (newValue === undefined) {
                        console.log('GET-ATTR');
                        return `Oh - ${this.tag}`;
                    } else {
                        this.tag = newValue;
                        console.log('SET-ATTR');
                        return newValue;
                    }
                }
            };
        };

        const base = forKey('virtual');
        expect(base.virtual()).toEqual('Oh - undefined');

        const extended = {
            ...base,
            tag: 'hi',
            childAttr: 'protected against access from base references'
        };

        expect(base.virtual()).toEqual('Oh - undefined');
        expect(extended.virtual()).toEqual('Oh - hi');

        base.virtual('Bye');
        expect(base.virtual()).toEqual('Oh - Bye');
        expect(extended.virtual()).toEqual('Oh - hi');

        extended.virtual('Welcome');
        expect(base.virtual()).toEqual('Oh - Bye');
        expect(extended.virtual()).toEqual('Oh - Welcome');
    });

    it('should handle dynamic first-level (shallow) virtual accessors', () => {
        const forKey = function (key) {
            return {
                [`get${key[0].toUpperCase()}${key.slice(1)}`](newValue) {
                    if (newValue === undefined) {
                        console.log(`GET-ATTR::${key}`);
                        return this[key];
                    } else {
                        this[key] = newValue;
                        console.log(`SET-ATTR::${key}`);
                        return newValue;
                    }
                }
            };
        };

        const attrName = 'childAttr';
        const expectedAccessorName = `get${attrName[0].toUpperCase()}${attrName.slice(1)}`;
        const base = forKey('childAttr');
        expect(base[expectedAccessorName]()).toEqual();

        const theGist = 'protected against access from base references';

        const extended = {
            ...base,
            tag: 'hi',
            childAttr: theGist
        };

        expect(base[expectedAccessorName]()).toEqual();
        expect(extended[expectedAccessorName]()).toEqual(theGist);

        base[expectedAccessorName]('Bye');
        expect(base[expectedAccessorName]()).toEqual('Bye');
        expect(extended[expectedAccessorName]()).toEqual(theGist);

        extended[expectedAccessorName]('Welcome');
        expect(base[expectedAccessorName]()).toEqual('Bye');
        expect(extended[expectedAccessorName]()).toEqual('Welcome');
    });
});

describe.skip('Catchers', () => {
    it('should handle dynamic first-level (shallow) virtual accessors', () => {
        const catcher = function (keys) {
            const setInto = self => name => value => self[name] = value;
            const getFrom = self => name => self[name];

            return {
                ['___included']() {
                    return keys;
                },
                //
                [`get___`](newValues) {
                    if (newValues === undefined) {
                        const getter = getFrom(this);
                        const ___included = this.___included();
                        console.log(`GET-ATTR::${___included}`);
                        return ___included.map(k => getter(k));
                    } else {
                        const setter = setInto(this);
                        const ___included = this.___included();

                        F.map(
                            ([k, nV]) => setter(k)(nV),
                            F.zip(___included, newValues));
                        console.log(`SET-ATTR::${___included} ---> ${newValues}`);
                        return this; // mutating catcher
                    }
                }
            };
        };

        const attrName = 'childAttr';
        const expectedAccessorName = `get___`;
        // const base = forKey('childAttr');
        // expect(base[expectedAccessorName]()).toEqual();

        const theGist = 'protected against access from base references';

        const theList = ['tag', attrName, 'notThere', 'not-there', 'catchMeIYCe', 'catchMeiyce', 'catch[Mice]', 'catchMeIntoYourContainer', 'catchMeIntoYourContainerEventually'];
        const shallowCatcher = catcher(theList);
        const extended = {
            ...shallowCatcher,
            tag: 'hi',
            childAttr: theGist,
            catchMeIYC: {},
            catchMeIntoYourContainer: []
        };

        const lotsOfUndefind = [];
        lotsOfUndefind.length = theList.length;
        expect(shallowCatcher[expectedAccessorName]()).toEqual(lotsOfUndefind);
        const catcherResults = ['hi', theGist, , , , , , [], undefined];
        expect(extended[expectedAccessorName]()).toEqual(catcherResults);

        shallowCatcher[expectedAccessorName]('Bye');
        const stringIteratorResults = ["B", "y", "e", undefined, undefined, undefined, undefined, undefined, undefined];
        expect(shallowCatcher[expectedAccessorName]()).toEqual(stringIteratorResults);
        expect(extended[expectedAccessorName]()).toEqual(catcherResults);
        expect(extended).toEqual({
                "___included": expect.any(Function),
                "catchMeIYC": {},
                "catchMeIntoYourContainer": [],
                "childAttr": "protected against access from base references",
                "get___": expect.any(Function),
                "tag": "hi"
            }
        );

        extended[expectedAccessorName]('Welcome');
        expect(shallowCatcher[expectedAccessorName]()).toEqual(stringIteratorResults);
        expect(extended[expectedAccessorName]()).toEqual(["W", "e", "l", "c", "o", "m", "e", [], undefined]);

        expect(extended).toEqual({
                "___included": expect.any(Function),
                "catchMeIYC": {},
                "catchMeIYCe": "o",
                "catchMeIntoYourContainer": [],
                "catchMeiyce": "m",
                "catch[Mice]": "e",
                "childAttr": "e",
                "get___": expect.any(Function),
                "not-there": "c",
                "notThere": "l",
                "tag": "W"
            }
        );
    });
    it('should handle dynamic json-atom immutable virtual accessors', () => {
        // const catcher = function (keys) {
        //     const setInto = self => path => value => set(`$.${path}`)(value)(self);
        //     const getFrom = self => path => get(`$.${path}`)(self);
        //
        //     return {
        //         ['___included']() {
        //             return keys;
        //         },
        //         //
        //         [`get___`](newValues) {
        //             if (newValues === undefined) {
        //                 const getter = getFrom(this);
        //                 const ___included = this.___included();
        //                 console.log(`GET-ATTR::${___included}`);
        //                 return ___included.map(k => (console.log('<< K::', k), console.log('<< V::', getter(k)), getter(k)));
        //             } else {
        //                 const setter = setInto(this);
        //                 const ___included = this.___included();
        //
        //                 const reducingFn = ({revisionSetter, value}, [k, nV]) => {
        //                     const newRevision = revisionSetter(k)(nV);
        //                     return {revisionSetter: setInto(newRevision), value: newRevision};
        //                 };
        //                 const initFn = () => ({revisionSetter: setInto(this)});
        //                 const enumerable = F.zip(___included, newValues);
        //                 const resultFn = x => x.value;
        //
        //
        //                 const revisions = F.reduce(reducingFn, initFn, enumerable, resultFn);
        //                 //
        //                 // const revisions = F.map(
        //                 //     ([k, nV]) => (console.log('>> K::', k), console.log('>> V::', nV), setter(k)(nV)),
        //                 //     F.zip(___included, newValues));
        //                 console.log(`SET-ATTR::${___included} ---> ${JSON.stringify(newValues, null, 0)}`);
        //                 return revisions;
        //             }
        //         }
        //     };
        // };

        const attrName = 'childAttr';
        const expectedAccessorName = `get___`;
        // const base = forKey('childAttr');
        // expect(base[expectedAccessorName]()).toEqual();

        const theGist = 'protected against access from base references';

        const theList = ['a1', 'a1.b1', 'a1.b1.c1', 'a1.b1.c1.name', 'a1.b1.c1.id', 'a2', 'a2.b2', 'a2.b2[0]', 'a2.b2[0].value'];
        const theProvided = [{}, {}, {id: '007'}, 'Bond ... James Bond', 'SLYD', {}, [], {value: 'Gothca'}, {value: 'NO!'}];
        expect(theList.length).toEqual(theProvided.length);

        const accessors = require('./accessors');
        const deepCatcher = accessors.catcher(theList);
        const extended = {
            ...deepCatcher,
            a1: {some: 'a1-stale-value', b1: {value: 'b1-stale-value'}},
            catchMeIntoYourContainer: []
        };

        const lotsOfUndefind = [];
        lotsOfUndefind.length = theList.length;
        expect(() => deepCatcher[expectedAccessorName]()).toThrow(/Cannot read property 'b1' of undefined/); // Cannot read property 'c1' of undefined
        const catcherResults = ['hi', theGist, , , , , , [], undefined];
        expect(() => extended[expectedAccessorName]()).toThrow(/Cannot read property 'name' of undefined/);

        const newRevision = deepCatcher[expectedAccessorName](theProvided);
        expect(newRevision).toEqual({
            "___included": expect.any(Function),
            "a1": {"b1": {"c1": {"id": "SLYD", "name": "Bond ... James Bond"}}},
            "a2": {"b2": [{"value": {"value": "NO!"}}]},
            "get___": expect.any(Function)
        });

        expect(() => deepCatcher[expectedAccessorName]()).toThrow(/Cannot read property 'b1' of undefined/);
        expect(() => extended[expectedAccessorName]()).toThrow(/Cannot read property 'name' of undefined/);
        expect(extended).toEqual({
                "___included": expect.any(Function),
                "a1": {"b1": {"value": "b1-stale-value"}, "some": "a1-stale-value"},
                "catchMeIntoYourContainer": [],
                "get___": expect.any(Function)
            }
        );

        const extendedNewRevision = {...deepCatcher, ...newRevision};
        expect(extendedNewRevision.___included()).toEqual(["a1", "a1.b1", "a1.b1.c1", "a1.b1.c1.name", "a1.b1.c1.id", "a2", "a2.b2", "a2.b2[0]", "a2.b2[0].value"]);

        expect(extendedNewRevision[expectedAccessorName]()).toEqual(
            [
                {
                    "b1": {
                        "c1": {
                            "id": "SLYD",
                            "name": "Bond ... James Bond"
                        }
                    }
                },
                {"c1": {"id": "SLYD", "name": "Bond ... James Bond"}},
                {
                    "id": "SLYD",
                    "name": "Bond ... James Bond"
                },
                "Bond ... James Bond",
                "SLYD",
                {"b2": [{"value": {"value": "NO!"}}]},
                [{"value": {"value": "NO!"}}],
                {"value": {"value": "NO!"}},
                {"value": "NO!"}]
        );
    });
});
