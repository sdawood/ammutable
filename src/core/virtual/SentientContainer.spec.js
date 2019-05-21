const F = require('functional-pipelines');
const {BehaviorSubject} = require('rxjs');
const {take, toArray} = require('rxjs/operators');

const {shredder, unshredder, Unprism} = require('./SentientContainer');

const series = require('./mini-series.data');
const {show, aLine} = require('../../utils/trace');

describe('scenario: shredder', () => {
    it('works: for modes [nodes, pairs, paths, values]', () => {
        const result = shredder(series, {modes: ['nodes', 'pairs', 'paths', 'values']});
        const expectedResult = {
            nodes: [{"path": "$.episodes"}, {"path": "$.episodes.EP1"}, {"path": "$.episodes.EP1.EP11"}, {"path": "$.episodes.EP1.EP11.start"}, {"path": "$.episodes.EP1.EP11.start.place"}, {"path": "$.episodes.EP1.EP11.start.time"}, {"path": "$.episodes.EP1.EP12"}, {"path": "$.episodes.EP1.EP12.start"}, {"path": "$.episodes.EP1.EP12.start.place"}, {"path": "$.episodes.EP1.EP12.start.time"}, {"path": "$.episodes.EP1.EP13"}, {"path": "$.episodes.EP1.EP13.start"}, {"path": "$.episodes.EP1.EP13.start.place"}, {"path": "$.episodes.EP1.EP13.start.time"}, {"path": "$.episodes.EP1.sequence"}, {"path": "$.episodes.EP1.sequence[0]"}, {"path": "$.episodes.EP1.sequence[1]"}, {"path": "$.episodes.EP1.sequence[2]"}, {"path": "$.episodes.EP2"}, {"path": "$.episodes.EP2.EP21"}, {"path": "$.episodes.EP2.EP21.start"}, {"path": "$.episodes.EP2.EP21.start.place"}, {"path": "$.episodes.EP2.EP21.start.time"}, {"path": "$.episodes.EP2.EP22"}, {"path": "$.episodes.EP2.EP22.start"}, {"path": "$.episodes.EP2.EP22.start.place"}, {"path": "$.episodes.EP2.EP22.start.time"}, {"path": "$.episodes.EP2.EP23"}, {"path": "$.episodes.EP2.EP23.start"}, {"path": "$.episodes.EP2.EP23.start.place"}, {"path": "$.episodes.EP2.EP23.start.time"}, {"path": "$.episodes.EP2.sequence"}, {"path": "$.episodes.EP2.sequence[0]"}, {"path": "$.episodes.EP2.sequence[1]"}, {"path": "$.episodes.EP2.sequence[2]"}, {"path": "$.episodes.EP3"}, {"path": "$.episodes.EP3.EP31"}, {"path": "$.episodes.EP3.EP31.start"}, {"path": "$.episodes.EP3.EP31.start.place"}, {"path": "$.episodes.EP3.EP31.start.time"}, {"path": "$.episodes.EP3.EP32"}, {"path": "$.episodes.EP3.EP32.start"}, {"path": "$.episodes.EP3.EP32.start.place"}, {"path": "$.episodes.EP3.EP32.start.time"}, {"path": "$.episodes.EP3.EP33"}, {"path": "$.episodes.EP3.EP33.start"}, {"path": "$.episodes.EP3.EP33.start.place"}, {"path": "$.episodes.EP3.EP33.start.time"}, {"path": "$.episodes.EP3.sequence"}, {"path": "$.episodes.EP3.sequence[0]"}, {"path": "$.episodes.EP3.sequence[1]"}, {"path": "$.episodes.EP3.sequence[2]"}, {"path": "$.sequence"}, {"path": "$.sequence[0]"}, {"path": "$.sequence[1]"}, {"path": "$.sequence[2]"}]
        };

        expect(result.nodes.map(({path}) => ({path}))).toEqual(expectedResult.nodes);

        expect(result.nodes.map(({path, value}) => [path, value]))
        .toEqual(result.pairs);

        expect([...F.zip(result.paths, result.values)])
        .toEqual(result.pairs);

    });
});


describe('scenario: unshredder', () => {
    it('works: ', () => {
        const {nodes, pairs} = shredder(series, {modes: ['nodes', 'pairs']});
        const resultNodes = unshredder({nodes});

        expect(resultNodes).toEqual(series);

        const resultPairs = unshredder({pairs});
        expect(resultPairs).toEqual(series);
    });
});

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
                    // expect(journal[0].value.episodes.EP2.EP21.start.place).toEqual('EP21-Place');
                    expect(journal[1].value.episodes.EP2.EP21.start.place).toEqual('La La');
                    expect(journal[2].value.episodes.EP3.EP33.start.place).toEqual('LAND');

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

        // expect(resultNodes.version).toEqual(0);
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