const {BehaviorSubject, ReplaySubject, Subject} = require('rxjs');
const {get, set, apply} = require('json-atom');

const Writer = subject => {
    const startValue = {type: 'SnapShot', payload: subject.value};
    let ___init___ = true;
    let _new = stream$ => ({
        ___marker: '@_x_>w>_New Begining',
        gets(url) {
            show('>', stream$.value);
            show('>', get(url)(stream$.value));
            return get(url)(stream$.value);
        },
        sets(url) {
            return value => {
                show('>*', stream$.value);
                // LOoOK_OvEr_hErE @TODO: NOTICE HOW THE SHADES.SET FOUND MY get(), THAT'S A PORTAL BACK INTO SHADES,
                // RENAMING to gets/sets changed the behavior
                const newValue = set(url)(value)(stream$.value);
                show(typeof newValue);
                const newWriter = Object.assign(new newValue.constructor(), newValue, _new(stream$));
                stream$.next(newWriter);
                return newWriter;
            }
        }
    });
    return _new(subject);
};

const show = (...args) => console.log('DEBUG::', aLine(), ...args.map(arg => typeof arg !== 'string' ? JSON.stringify(arg, null, 0) : arg));
const aLine = (length = 5) => (a = [], a.length = 10, a.fill('-')).join('');

const journal = new BehaviorSubject({});
journal.subscribe(entry => show('+JournalEntry', entry));
show(journal.value);
show(Writer(journal).gets('$.hello'));
show(get('$.hello')(journal.value));
const returns = Writer(journal).sets('$.hello')('RP');
show({returns});
show(journal.value);
show(Writer(journal).gets('$.hello'));
show(get('$.hello')(journal.value));
show(journal.value);
show(aLine(100));
show(aLine(100));
show(Writer(journal)
.sets('$.bye')('Bad Code')
// .get('bye')
);
show(journal.value);
