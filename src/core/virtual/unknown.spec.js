const {BehaviorSubject} = require('rxjs');
const {take, toArray, distinctUntilChanged, distinctUntilKeyChanged} = require('rxjs/operators');

const {get, set, apply} = require('json-atom');

const {Writer} = require('./unknown');
const {show, aLine} = require('../../utils/trace');

describe('Journal Writer', () => {
    const journal = new BehaviorSubject({value: {}});

    it('should emit the correct journal entries', done => {

        // it('should gets as shades.get from subject.value', () => {

        journal.subscribe(entry => show('+JournalEntry', entry, entry.gets ? entry.gets('$.hello') : 'NO .gets'));

        journal.pipe(take(6), toArray()).subscribe(
            journal => {
                try {
                    expect(journal).toEqual(
                        [{"value": {}}, {
                            "___marker": {"labels": ["#JournalWriter.v0.0.1"], "version": 2},
                            "action": "set",
                            "gets": expect.any(Function),
                            "path": "$.hello",
                            "sets": expect.any(Function),
                            "value": {"hello": "RP"}
                        }, {
                            "___marker": {"labels": ["#JournalWriter.v0.0.1"], "version": 2},
                            "action": "set",
                            "gets": expect.any(Function),
                            "path": "$.bye",
                            "sets": expect.any(Function),
                            "value": {"bye": "Bad Code", "hello": "RP"}
                        }, {
                            "___marker": {"labels": ["#JournalWriter.v0.0.1"], "version": 3},
                            "action": "set",
                            "gets": expect.any(Function),
                            "path": "$.journaledPost",
                            "sets": expect.any(Function),
                            "value": {
                                "bye": "Bad Code",
                                "hello": "RP",
                                "journaledPost": {"author": "Shady Dawood", "timestamp": "2019-05-17T18:11:29.344Z"}
                            }
                        }, {
                            "___marker": {"labels": ["#JournalWriter.v0.0.1"], "version": 4},
                            "action": "set",
                            "gets": expect.any(Function),
                            "path": "$.hello",
                            "sets": expect.any(Function),
                            "value": {
                                "bye": "Bad Code",
                                "hello": "New World",
                                "journaledPost": {"author": "Shady Dawood", "timestamp": "2019-05-17T18:11:29.344Z"}
                            }
                        }, {
                            "___marker": {"labels": ["#JournalWriter.v0.0.1"], "version": 5},
                            "action": "set",
                            "gets": expect.any(Function),
                            "path": "$.bye",
                            "sets": expect.any(Function),
                            "value": {
                                "bye": "Old World",
                                "hello": "New World",
                                "journaledPost": {"author": "Shady Dawood", "timestamp": "2019-05-17T18:11:29.344Z"}
                            }
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
        show(Writer(journal).gets('$.hello'));
        show(get('$.hello')(journal.value));
        // });


        // it('should gets what it sets regardless', () => {
        const returns = Writer(journal).sets('$.hello')('RP');
        show({returns});
        show('JOURNAL-VALUE:', journal.value);
        show(Writer(journal).gets('$.hello'));
        show(get('$.value.hello')(journal.value));
        show('JOURNAL-VALUE:', journal.value);
        // });

        // describe('Travelling Journal Writer', () => {
        show(aLine(100));
        show(aLine(100));

        // it('should still sets and gets even after a journey', () => {
        show(Writer(journal)
        .sets('$.bye')('Bad Code')
// .get('bye')
        );
        show('************************************');
        show('JOURNAL-VALUE:', journal.value);
        show('************************************');
        journal.value.sets('$.journaledPost')({"timestamp": "2019-05-17T18:11:29.344Z", "author": "Shady Dawood"});

        const atom = journal.value;
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
        show(journal.value.___marker);
        show(journal.value.___marker);
        show(journal.value.___marker);
        show(journal.value.___marker);
        show(journal.value.___marker);
        // });
        // });
    });
});
