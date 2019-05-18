const {shredder, unshredder} = require('./unknown-container');

const series = require('./mini-series.data');

describe('scenario: shredder', () => {
    it('works: for modes [nodes, pairs, paths, values]', () => {
        const result = shredder(series, {modes: ['nodes', 'pairs', 'paths', 'values']});
        const expectedResult = {
            nodes: [{"path": "$.episodes"}, {"path": "$.episodes.EP1"}, {"path": "$.episodes.EP1.EP11"}, {"path": "$.episodes.EP1.EP11.start"}, {"path": "$.episodes.EP1.EP11.start.place"}, {"path": "$.episodes.EP1.EP11.start.time"}, {"path": "$.episodes.EP1.EP12"}, {"path": "$.episodes.EP1.EP12.start"}, {"path": "$.episodes.EP1.EP12.start.place"}, {"path": "$.episodes.EP1.EP12.start.time"}, {"path": "$.episodes.EP1.EP13"}, {"path": "$.episodes.EP1.EP13.start"}, {"path": "$.episodes.EP1.EP13.start.place"}, {"path": "$.episodes.EP1.EP13.start.time"}, {"path": "$.episodes.EP1.sequence"}, {"path": "$.episodes.EP1.sequence[0]"}, {"path": "$.episodes.EP1.sequence[1]"}, {"path": "$.episodes.EP1.sequence[2]"}, {"path": "$.episodes.EP2"}, {"path": "$.episodes.EP2.EP21"}, {"path": "$.episodes.EP2.EP21.start"}, {"path": "$.episodes.EP2.EP21.start.place"}, {"path": "$.episodes.EP2.EP21.start.time"}, {"path": "$.episodes.EP2.EP22"}, {"path": "$.episodes.EP2.EP22.start"}, {"path": "$.episodes.EP2.EP22.start.place"}, {"path": "$.episodes.EP2.EP22.start.time"}, {"path": "$.episodes.EP2.EP23"}, {"path": "$.episodes.EP2.EP23.start"}, {"path": "$.episodes.EP2.EP23.start.place"}, {"path": "$.episodes.EP2.EP23.start.time"}, {"path": "$.episodes.EP2.sequence"}, {"path": "$.episodes.EP2.sequence[0]"}, {"path": "$.episodes.EP2.sequence[1]"}, {"path": "$.episodes.EP2.sequence[2]"}, {"path": "$.episodes.EP3"}, {"path": "$.episodes.EP3.EP31"}, {"path": "$.episodes.EP3.EP31.start"}, {"path": "$.episodes.EP3.EP31.start.place"}, {"path": "$.episodes.EP3.EP31.start.time"}, {"path": "$.episodes.EP3.EP32"}, {"path": "$.episodes.EP3.EP32.start"}, {"path": "$.episodes.EP3.EP32.start.place"}, {"path": "$.episodes.EP3.EP32.start.time"}, {"path": "$.episodes.EP3.EP33"}, {"path": "$.episodes.EP3.EP33.start"}, {"path": "$.episodes.EP3.EP33.start.place"}, {"path": "$.episodes.EP3.EP33.start.time"}, {"path": "$.episodes.EP3.sequence"}, {"path": "$.episodes.EP3.sequence[0]"}, {"path": "$.episodes.EP3.sequence[1]"}, {"path": "$.episodes.EP3.sequence[2]"}, {"path": "$.sequence"}, {"path": "$.sequence[0]"}, {"path": "$.sequence[1]"}, {"path": "$.sequence[2]"}]
        };
        expect(result.nodes.map(({path}) => ({path}))).toEqual(expectedResult);
    });
});


describe('scenario: unshredder', () => {
    it('works: ', () => {
        const {nodes, pairs} = shredder(series, {modes: ['nodes', 'pairs']});
        const resultNodes = unshredder(nodes, {mode: 'nodes'});
        const expectedResultNodes = require('./mini-series.data');

        expect(resultNodes).toEqual(expectedResultNodes);

        const resultPairs = unshredder(nodes, {mode: 'pairs'});
        const expectedResultPairs = {};
        expect(resultPairs).toEqual(expectedResultPairs);

        expect(resultPairs).toEqual(resultNodes).toEqual(series);
    });
});