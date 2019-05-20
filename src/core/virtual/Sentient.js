const {BehaviorSubject, ReplaySubject, Subject} = require('rxjs');
const {get, set, apply} = require('json-atom');
const {show, aLine} = require('../../utils/trace');
const {incrementalVersioner} = require('./version/generator');
const uuidV4 = require('uuid/v4');

const Writer = (subject, {labels = [uuidV4()]} = {}) => {
    const startValue = {type: 'SnapShot', payload: subject.value};
    let ___init___ = true;
    const versionBy = incrementalVersioner(); //@TODO: injectable versionProvider, otherwise every Writer is versioned independently
    const versionNext = () => {
        const {done, value} = versionBy.next();
        if (done) throw new Error('Version Generator Completed. Can not get next version value.');
        return value;
    };

    let _new = stream$ => ({
        gets(url) {
            show('<', url, stream$.value.value);
            return get(url)(stream$.value.value);
        },
        sets(url) {
            return value => {
                show(`>* ${url} current:`, stream$.value.value);
                // LOoOK_OvEr_hErE @TODO: NOTICE HOW THE SHADES.SET FOUND MY get(), THAT'S A PORTAL BACK INTO SHADES,
                // RENAMING to gets/sets changed the behavior
                const newValue = set(url)(value)(stream$.value.value);
                show('newValue:', typeof newValue, newValue);
                // new values are all assumed to be JSON compliant documents, meaning, the root gotta be a tree, end of discussion.
                const newWriter = Object.assign(
                    new newValue.constructor(),
                    {
                        value: newValue, path: url, action: 'set',
                        version: versionNext(), // @TODO a hashing-versioner can get the newValue passed into versionNext() to help version by digests and md5 hashes
                        labels: labels
                    }, _new(stream$));
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
