const jp = require('jsonpath/jsonpath.min');
const F = require('functional-pipelines');
const {get, set} = require('json-atom');

const {stringify} = require('../../utils/json-path');

const {show, aLine} = require('../../utils/trace');

const Shredder_Mode_Actors = {
    [undefined]: x => x,
    nodes: ({path, value}) => ({path: stringify(path), value}),
    pairs: ({path, value}) => [stringify(path), value],
    paths: x => stringify(x.path),
    values: x => x.value
};

const orderBy = (key, order) => {
    return ['asc', 'node-leaf-groups'].includes(order)
        ? (a, b) => +(a[key] > b[key]) || +(a[key] === b[key]) - 1
        : ['desc', 'leaf-node-groups'].includes(order)
            ? (a, b) => +(b[key] > a[key]) || +(b[key] === a[key]) - 1
            : (() => {
                throw new Error(`Invalid options.order: ${order}`);
            })()
};

const shredder = (document, {modes = ['nodes'], order = 'node-leaf-groups'} = {}) => {
    const nodes = jp.nodes(document, '$..*')
    .sort(orderBy('path', order));
    // @TODO: investigate other sorting semantics, like bfs and dfs

    return modes.reduce((acc, mode) => {
        acc[mode] = nodes.map(Shredder_Mode_Actors[mode]);
        return acc;
    }, {});
};

const Unshredder_Mode_Actors = {
    nodes: {
        unit: () => ({}),
        orderKey: 'path',
        reducer: (acc, {path, value}) => {
            show(path, ':=', value);
            acc = set(path)(value)(acc);
            return acc;
        }
    },
    pairs: {
        unit: () => ({}),
        orderKey: 0,
        reducer: (acc, [path, value]) => {
            show(path, ':=', value);
            acc = set(path)(value)(acc);
            return acc;
        }
    }
};

const unshredder = (pathValueRecords, {mode = 'nodes'} = {}) => {
    const initFn = Unshredder_Mode_Actors[mode].unit;
    const reducingFn = Unshredder_Mode_Actors[mode].reducer;
    show(`reducingFn`, reducingFn);
    return F.reduce(reducingFn, initFn, pathValueRecords.slice().sort(orderBy(Unshredder_Mode_Actors[mode].orderKey, 'node-leaf-groups')));
};

module.exports = {
    shredder,
    Shredder_Mode_Actors,
    unshredder,
    Unshredder_Mode_Actors
};