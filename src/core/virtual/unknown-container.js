const jp = require('jsonpath/jsonpath.min');
const


const shrederModes = {
    [undefined]: x => x,
    nodes: x => x,
    paths: x => x.path,
    values: x => x.value
};

const shreder = (document, {modes = ['nodes']} = {}) => {
    const nodes = jp.nodes(document, '$..*')
    .sort(sortBy('path'));

    return modes.reduce((acc, mode) => {
        acc[mode] = nodes.map(shrederModes[mode]);
        return acc;
    }, {});

};

module.exports = {
    shreder
};