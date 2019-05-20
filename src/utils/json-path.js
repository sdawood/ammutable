const jp = require('jsonpath/jsonpath.min');

const {show, aLine} = require('./trace');

// from node_modules/jsonpath/lib/index.js:192
const normalize = function (path) {

    if (path === undefined) throw new Error(`Invalid argument: path, cannot be ${path}`);

    path = typeof path === 'number' ? `${path}` : path; // FIX FOR: the code accepts [1, 'a'], [1] but barfs on 1 as standalone numeric subscript for root at index === 0

    if (typeof path === 'string') {

        return jp.parse(path);

    } else if (Array.isArray(path) && ['string', 'number'].includes(typeof path[0])) { // FIX FOR: the code accepts '0.a.b' but barfs on [0, 'a', 'b']

        var _path = [{expression: {type: 'root', value: '$'}}];

        path.forEach(function (component, index) {

            if (index === 0) {
                if (component === '$') return;
                if (typeof component === 'number') component = `${component}` // FIX FOR: the code accepts '0.a.b' but barfs on [0, 'a', 'b']
            }

            if (typeof component === 'string' && component.match(/'^[a-zA-Z_]+[a-zA-Z0-9_]*$/u)) { // dict.identifier

                _path.push({
                    operation: 'member',
                    scope: 'child',
                    expression: {value: component, type: 'identifier'}
                });

            } else {

                var type = typeof component === 'number' ?
                    'numeric_literal' : 'string_literal';

                _path.push({
                    operation: 'subscript',
                    scope: 'child',
                    expression: {value: component, type: type}
                });
            }
        });

        return _path;

    } else if (Array.isArray(path) && typeof path[0] === 'object') {

        return path
    }

    throw new Error(`couldn't understand path: ${path}`);
};


const stringify = variousPathFormats => {
    const ast = normalize(variousPathFormats);
    // show(`ast:`, ast);
    const parts = ast.map(({expression: {value}}) => value); // @TODO: union and descendant expressions are nested, may be recursive-reduce is best fit
    // show({parts});
    // show(typeof parts[0]);
    const partsStartsWithNonNumeric = [typeof parts[0] === 'number' ? `${parts[0]}` : parts[0], ...parts.slice(1)]; // FIX FOR: the code accepts [1, 'a'], [1] but barfs on 1 as standalone numeric subscript for root at index === 0
    // show(`>>># before stringify`, partsStartsWithNonNumeric);
    // show(`partsStartsWithNonNumeric:`, partsStartsWithNonNumeric);
    const stringified = jp.stringify(partsStartsWithNonNumeric);
    // show(stringified);
    return stringified;
};

module.exports = {
    normalize,
    stringify
};


