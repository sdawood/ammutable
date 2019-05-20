const {get} = require('json-atom');
const {stringify} = require('./json-path');

const {show} = require('./trace');

const sortByPath = (url, {mapping = v => v, asc = true} = {}) => (a, b) => {
    // url = typeof url === 'number' ? `${url}` : url;

    let [left, right] = asc ? [a, b] : [b, a];
    url = stringify(url); // @TODO: patched jp.normalize + jp.stringify produce an absolute path, refactor for feature #RELATIVE/.../PATHS
    const currentA = get(url)(left);
    const currentB = get(url)(right);
    show(currentA, currentB);
    const result = +(mapping(currentA) > mapping(currentB)) || +(mapping(currentA) === mapping(currentB)) - 1;
    show(`is`, a, `before`, b, `? result:`, result);
    return result;
}


module.exports = {sortByPath};
