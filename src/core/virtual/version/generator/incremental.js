const {show, aLine} = require('../../../../utils/trace');

const incrementer = previous => (by = 0) => previous === undefined ? 0 : by ? previous + by : previous;

function* versioner(context) {
    let patchVersion = incrementer()(); // unit
    let incrementVersion = incrementer(patchVersion); // sensible default and a marker where this was put to use, partitionByVersioner marker
    let currentVersion = incrementVersion(1);
    while (true) {
        show({currentVersion});
        const controls = yield currentVersion;
        show({controls: controls === undefined ? 'null' : controls});
        const {forward = true, step = 1, backward = false} = controls || {}; // @TODO test backward stepping
        show({forward, step, backward});
        currentVersion = backward ? incrementer(currentVersion)(-step) : incrementer(currentVersion)(step);
        show({nextVersionToBeYielded: currentVersion});
    }
}

module.exports = {
    versioner
};
