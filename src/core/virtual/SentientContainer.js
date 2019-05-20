const jp = require('jsonpath/jsonpath.min');
const F = require('functional-pipelines');
const {get, set} = require('json-atom');
const {MultiWriter} = require('./SentientBatch');
const uuidV4 = require('uuid/v4');

const {stringify} = require('../../utils/json-path');

const {show, aLine} = require('../../utils/trace');

const Shredder_Mode_Actors = {
    // @TODO NOTICE having the parameter called toString had some unusual behavior with jest test, toString was invoked by some other piece of code!!!
    nodes: ({toStringFn = stringify} = {}) => ({path, value}) => ({path: toStringFn(path), value}),
    pairs: ({toStringFn = stringify} = {}) => ({path, value}) => [toStringFn(path), value],
    paths: ({toStringFn = stringify} = {}) => x => toStringFn(x.path),
    values: () => x => x.value
};

const orderBy = (key, order, {xf = x => x} = {}) => {
    let compareFunction;
    if (['asc', 'node-leaf-groups'].includes(order)) {
        compareFunction = (a, b) => +(xf(a[key]) > xf(b[key])) || +(xf(a[key]) === xf(b[key])) - 1;
    } else if (['desc', 'leaf-node-groups'].includes(order)) {
        compareFunction = (a, b) => +(xf(b[key]) > xf(a[key])) || +(xf(b[key]) === xf(a[key])) - 1
    }
    return compareFunction; // undefined triggers built-int array sort, which is idea for stringified paths or natural values
};

const shredder = (document, {modes = ['nodes'], order = 'node-leaf-groups'} = {}) => {
    let nodes = jp.nodes(document, '$..*');
    show(nodes);
    nodes = nodes
    .sort(orderBy('path', order, {xf: ps => ps.join('.')}));
    show(nodes);
    nodes = nodes
    .map(Shredder_Mode_Actors['nodes']());
    show(nodes);
    // @TODO: investigate other sorting semantics, like bfs and dfs

    return modes.reduce((acc, mode) => {
        const compareFunction = Unshredder_Mode_Atom_Actors[mode] !== undefined ? orderBy(Unshredder_Mode_Atom_Actors[mode].orderKey, order) : undefined;
        acc[mode] = nodes.map(Shredder_Mode_Actors[mode]()); //.sort(compareFunction);
        return acc;
    }, {});
};

const Unshredder_Mode_Atom_Actors = {
    nodes: {
        unit: () => ({}),
        reducer: (acc, {path, value}) => {
            show(path, ':=', value);
            acc = set(path)(value)(acc);
            return acc;
        },
        orderKey: 'path'
    },
    pairs: {
        unit: () => ({}),
        reducer: (acc, [path, value]) => {
            show(path, ':=', value);
            acc = set(path)(value)(acc);
            return acc;
        },
        orderKey: 0
    }
};

const Unshredder_Mode_SentientBatch_Actors = {
    nodes: {
        unit: () => ({}),
        reducer: (acc, {path, value}) => {
            show(path, ':=', value);
            acc = set(path)(value)(acc);
            return acc;
        },
        orderKey: 'path',
        keyFrom: ({path}) => path,
        valueFrom: ({value}) => value
    },
    pairs: {
        unit: () => ({}),
        reducer: (acc, [path, value]) => {
            show(path, ':=', value);
            acc = set(path)(value)(acc);
            return acc;
        },
        orderKey: 0,
        keyFrom: ([path]) => path,
        valueFrom: ([_, value]) => value
    }
};

const unshredder = ({nodes, pairs} = {}) => {
    const {entries, mode} = nodes ? {entries: nodes, mode: 'nodes'} : {entries: pairs, mode: 'pairs'}; // give priority to nodes if both are passed in
    const {unit: initFn, reducer: reducingFn} = Unshredder_Mode_Atom_Actors[mode];
    show(mode, Unshredder_Mode_Atom_Actors[mode]);
    show(initFn, reducingFn);
    return F.reduce(reducingFn, initFn, entries.slice().sort(orderBy(Unshredder_Mode_Atom_Actors[mode].orderKey, 'node-leaf-groups')));
};

const Unprism = (subject, {labels = [uuidV4()]} = {}) => ({nodes, pairs, withoutKeys = [], sortUpdates = true} = {}) => {
    const {entries, mode} = nodes ? {entries: nodes, mode: 'nodes'} : {entries: pairs, mode: 'pairs'}; // give priority to nodes if both are passed in

    const sortedEntries = sortUpdates ? entries.slice().sort(orderBy(Unshredder_Mode_SentientBatch_Actors[mode].orderKey, 'node-leaf-groups')) : entries.slice();
    const sortedKeys = sortedEntries.map(Unshredder_Mode_SentientBatch_Actors[mode].keyFrom);
    const sortedValues = sortedEntries.map(Unshredder_Mode_SentientBatch_Actors[mode].valueFrom);

    const multiWriter = MultiWriter(subject, {labels})(sortedKeys);
    return {value: multiWriter.updates(sortedValues).value, multiWriter};
};

module.exports = {
    shredder,
    Shredder_Mode_Actors,
    unshredder,
    Unshredder_Mode_Atom_Actors,
    Unprism
};