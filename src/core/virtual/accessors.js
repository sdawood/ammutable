const F = require('functional-pipelines');

const {get, set, apply} = require('json-atom');

const catcher = function (keys, notKeys = []) {
    const setInto = self => path => value => set(path[0] === '$' ? path : `$.${path}`)(value)(self);
    const getFrom = self => path => get(path[0] === '$' ? path : `$.${path}`)(self);

    return {
        ['___included'](newKeys) {
            keys = newKeys ? newKeys : keys;
            return keys;
        },
        [`___excluded`](newNotKeys) {
            notKeys = newNotKeys ? newNotKeys : notKeys;
            return notKeys;
        },
        [`filtered___`]() {

        },
        [`get___`](newValues) {
            if (newValues === undefined) {
                const getter = getFrom(this);
                const ___included = this.___included();
                console.log(`GET-ATTR::${___included}`);
                return ___included.map(k => (console.log('<< K::', k), console.log('<< V::', getter(k)), getter(k)));
            } else {
                const setter = setInto(this);
                const ___included = this.___included();

                const reducingFn = ({revisionSetter, value}, [k, nV]) => {
                    const newRevision = revisionSetter(k)(nV);
                    return {revisionSetter: setInto(newRevision), value: newRevision};
                };
                const initFn = () => ({revisionSetter: setInto(this)});
                const enumerable = F.zip(___included, newValues);
                const resultFn = x => x.value;


                const revisions = F.reduce(reducingFn, initFn, enumerable, resultFn);
                //
                // const revisions = F.map(
                //     ([k, nV]) => (console.log('>> K::', k), console.log('>> V::', nV), setter(k)(nV)),
                //     F.zip(___included, newValues));
                console.log(`SET-ATTR::${___included} ---> ${JSON.stringify(newValues, null, 0)}`);
                return revisions;
            }
        }
    };
};

module.exports = {
    catcher,
    getPath: get,
    setPath: set
};
