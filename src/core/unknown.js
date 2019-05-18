const {BehaviorSubject, ReplaySubject, Subject} = require('rxjs');
const {get, set, apply} = require('json-atom');
const {show, aLine} = require('../utils/trace');

const incrementer = previous => (by = 0) => previous === undefined ? 0 : by ? previous + by : previous;

function* versioner(context) {
    let patchVersion = incrementer()(); // unit
    let incrementVersion = incrementer(patchVersion); // sensible default and a marker where this was put to use, partitionByVersioner marker
    let currentVersion = incrementVersion(1);
    while (true) {
        const controls = yield currentVersion;
        // show({controls: controls === undefined ? 'null' : controls});
        const {forward = true, step = 1, backward = false} = controls || {};
        currentVersion = backward ? incrementer(currentVersion)(-step) : incrementer(currentVersion)(step);
    }
}

const Writer = subject => {
    const startValue = {type: 'SnapShot', payload: subject.value};
    let ___init___ = true;
    const versionBy = versioner(); //@TODO: injectable versionProvider
    let _new = stream$ => ({
        ___marker: {version: versionBy.next().value, labels: ['#JournalWriter.v0.0.1']},
        gets(url) {
            show('>', stream$.value.value);
            show('>', get(url)(stream$.value.value));
            return get(url)(stream$.value.value);
        },
        sets(url) {
            return value => {
                show('>*', stream$.value.value);
                // LOoOK_OvEr_hErE @TODO: NOTICE HOW THE SHADES.SET FOUND MY get(), THAT'S A PORTAL BACK INTO SHADES,
                // RENAMING to gets/sets changed the behavior
                const newValue = set(url)(value)(stream$.value.value);
                show(typeof newValue);
                const newWriter = Object.assign(new newValue.constructor(), {value: newValue, path: url, action: 'set'}, _new(stream$));
                stream$.next(newWriter);
                return newWriter;
            }
        }
    });
    return _new(subject);
};

module.exports = {
    Writer
};

// const journal = new BehaviorSubject({});
// journal.subscribe(entry => show('+JournalEntry', ++clicks, entry, entry.gets ? entry.gets('$.hello') : 'NO .gets'));
// show('JOURNAL-VALUE:', journal.value);
// show(Writer(journal).gets('$.hello'));
// show(get('$.hello')(journal.value));
// const returns = Writer(journal).sets('$.hello')('RP');
// show({returns});
// show('JOURNAL-VALUE:', journal.value);
// show(Writer(journal).gets('$.hello'));
// show(get('$.hello')(journal.value));
// show('JOURNAL-VALUE:', journal.value);
// show(aLine(100));
// show(aLine(100));
// show(Writer(journal)
// .sets('$.bye')('Bad Code')
// // .get('bye')
// );
// show('JOURNAL-VALUE:', journal.value);
// journal.value.sets('$.journaledPost')({"timestamp":"2019-05-17T18:11:29.344Z","author":"Shady Dawood"});
//
// const atom = journal.value;
// show(atom.gets('$.hello'));
// show(atom.gets('$.bye'));
// show(atom.gets('$.journaledPost'));
// show('JOURNAL-VALUE:', journal.value);
// show(atom.sets('$.hello')('New World'));
// show(atom.sets('$.bye')('Old World'));
// show(atom.sets('$.journaledPost')({"timestamp":"2019-05-17T18:14:50.344Z","author":"Shady Dawood"}));
// show('JOURNAL-VALUE:', journal.value);
// show(atom.gets('$.hello'));
// show(atom.gets('$.bye'));
// show(atom.gets('$.journaledPost'));
// show('JOURNAL-VALUE:', journal.value);
//
