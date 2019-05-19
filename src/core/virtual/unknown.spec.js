const {BehaviorSubject} = require('rxjs');
const {take, toArray, distinctUntilChanged, distinctUntilKeyChanged} = require('rxjs/operators');

const {get, set, apply} = require('json-atom');

const {Writer} = require('./unknown');
const {show, aLine} = require('../../utils/trace');

describe('Journal Writer', () => {
    const journal = new BehaviorSubject({value: {}});

    it('should emit the correct journal entries', done => {

        // it('should gets as shades.get from subject.value', () => {

        journal.subscribe(entry => show('+JournalEntry', entry, entry.gets ? entry.gets('$.hello') : 'Vanilla entry, no .gets!'));

        journal.pipe(take(6), toArray()).subscribe(
            journal => {
                try {
                    expect(journal).toEqual(
                        [{"value": {}}, {
                            "action": "set",
                            "gets": expect.any(Function),
                            "labels": ["origin: B"],
                            "path": "$.hello",
                            "sets": expect.any(Function),
                            "value": {"hello": "RP"},
                            "version": 1
                        }, {
                            "action": "set",
                            "gets": expect.any(Function),
                            "labels": ["origin: C"],
                            "path": "$.hello",
                            "sets": expect.any(Function),
                            "value": {"hello": "RP"},
                            "version": 1
                        }, {
                            "action": "set",
                            "gets": expect.any(Function),
                            "labels": ["origin: E"],
                            "path": "$.bye",
                            "sets": expect.any(Function),
                            "value": {"bye": "Bad Code", "hello": "RP"},
                            "version": 1
                        }, {
                            "action": "set",
                            "gets": expect.any(Function),
                            "labels": ["origin: E"],
                            "path": "$.journaledPost",
                            "sets": expect.any(Function),
                            "value": {
                                "bye": "Bad Code",
                                "hello": "RP",
                                "journaledPost": {"author": "Shady Dawood", "timestamp": "2019-05-17T18:11:29.344Z"}
                            },
                            "version": 2
                        }, {
                            "action": "set",
                            "gets": expect.any(Function),
                            "labels": ["origin: E"],
                            "path": "$.hello",
                            "sets": expect.any(Function),
                            "value": {
                                "bye": "Bad Code",
                                "hello": "New World",
                                "journaledPost": {"author": "Shady Dawood", "timestamp": "2019-05-17T18:11:29.344Z"}
                            },
                            "version": 3
                        }]
                    );
                    done();
                } catch (error) {
                    done.fail(error);
                }
            },
            error => done.fail(error),
            () => show('ALL-DONE')
        );

        show('JOURNAL-VALUE:', journal.value);
        show(Writer(journal, {labels: ['origin: A']}).gets('$.hello')); // should not be there yet
        show(get('$.hello')(journal.value));  // should not be there yet
        // });


        // it('should gets what it sets regardless', () => {
        const returns = Writer(journal, {labels: ['origin: B']}).sets('$.hello')('RP');
        show({returns});
        show(`repeat the action, check on version`);
        Writer(journal, {labels: ['origin: C']}).sets('$.hello')('RP');
        show('JOURNAL-VALUE:', journal.value);
        show(Writer(journal, {labels: ['origin: D']}).gets('$.hello'));
        show(get('$.value.hello')(journal.value));
        show('JOURNAL-VALUE:', journal.value);
        // });

        // describe('Travelling Journal Writer', () => {
        show(aLine(100));
        show(aLine(100));

        // it('should still sets and gets even after a journey', () => {
        show(Writer(journal, {labels: ['origin: E']})
        .sets('$.bye')('Bad Code')
// .get('bye')
        );
        show('************************************');
        show('JOURNAL-VALUE:', journal.value);
        show('************************************');
        journal.value.sets('$.journaledPost')({"timestamp": "2019-05-17T18:11:29.344Z", "author": "Shady Dawood"});

        const atom = journal.value;
        show(`doing the actions via the same atom achieves monotonic version generator.next() calls`);
        show(atom.gets('$.hello'));
        show(atom.gets('$.bye'));
        show(atom.gets('$.journaledPost'));
        show('JOURNAL-VALUE:', journal.value);
        show(atom.sets('$.hello')('New World'));
        show(atom.sets('$.bye')('Old World'));
        show(atom.sets('$.journaledPost')({"timestamp": "2019-05-17T18:14:50.344Z", "author": "Shady Dawood"}));
        show('JOURNAL-VALUE:', journal.value);
        show(atom.gets('$.hello'));
        show(atom.gets('$.bye'));
        show(atom.gets('$.journaledPost'));
        show('JOURNAL-VALUE:', journal.value);
        // });
        // });
    });
});
