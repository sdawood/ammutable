const F = require('functional-pipelines');

const {get, set, apply} = require('json-atom');
const {Writer} = require('./Sentient');

const {show, aLine} = require('../../utils/trace');
const uuidV4 = require('uuid/v4');

const normalizePath = path => path[0] === '$' ? path : `$.${path}`;

// @TODO: BASIC IDEA, a catcher can get nodes, upon setting it would use the unknown bound to a stream, and return jsonpath nodes that can be materialized into an active dictionary

const MultiWriter =  (subject, {labels = [uuidV4()]} = {}) => (keys, {withoutKeys = [], sortUpdates = false} = {}) => {
    let journalWriter = Writer(subject, {labels});
    const setInto = writer => path => value => writer.sets(normalizePath(path))(value);
    const getFrom = writer => path => writer.gets(normalizePath(path));

    return {
        ['___included'](newKeys) {
            // keys = newKeys ? newKeys : keys; // @TODO: encourage reuse or be immutable about focus points
            return keys;
        },
        [`___excluded`](newNotKeys) {
            // withoutKeys = newNotKeys ? newNotKeys : withoutKeys;  // @TODO: encourage reuse or be immutable about focus points
            return withoutKeys;
        },
        [`___filtered`]() {
            throw new Error('Not Implemented Yet! @2019-05-17T23:40:34.616Z');
        },
        [`updates`](newValues) {
            if (newValues === undefined) {
                const getter = getFrom(journalWriter);
                const ___included = this.___included();
                show(`GET-ATTR::`, ___included);
                return ___included.map(k => (show('<< K::', k), show('<< V::', getter(k)), getter(k)));
            } else {
                const setter = setInto(journalWriter);
                const ___included = this.___included();

                const reducingFn = ({revisionSetter, value}, [k, nV]) => {
                    const newRevision = revisionSetter(k)(nV);
                    return {revisionSetter: setter, value: newRevision}; // @TODO: do we need to create a new setter into a new Writer ever?
                };
                const initFn = () => ({revisionSetter: setter});
                const sortBy = (a, b) => +(a[0] > b[0]) || +(b[0] === a[0]) - 1;
                const sortedPairs = sortUpdates ? [...F.zip(___included, newValues)].sort(sortBy) : [...F.zip(___included, newValues)];
                show({sortedPairs});
                const resultFn = x => x.value;


                const HEAD = F.reduce(reducingFn, initFn, sortedPairs, resultFn);
                //
                // const revisions = F.map(
                //     ([k, nV]) => (console.log('>> K::', k), console.log('>> V::', nV), setter(k)(nV)),
                //     F.zip(___included, newValues));
                show(`SET-ATTR::`, sortedPairs.map(([k, v]) => show(k, ':=', v)).length, 'updates in total');
                return HEAD;
            }
        }
    };
};

module.exports = {
    MultiWriter
};
