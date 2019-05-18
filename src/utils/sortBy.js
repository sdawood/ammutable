const {get} = require('json-atom');
const {stringify} = require('./json-path');

const sortBy = (url, {mapping = v => v, asc = true} = {}) => (a, b) => {
    // url = typeof url === 'number' ? `${url}` : url;

    [a, b] = asc ? [a, b] : [b, a];
    url = stringify(url); // @TODO: patched jp.normalize + jp.stringify produce an absolute path, refactor for feature #RELATIVE/.../PATHS
    const currentA = get(url)(a);
    const currentB = get(url)(b);
    return +(mapping(currentA) > mapping(currentB)) || +(mapping(currentA) === mapping(currentB)) - 1;
}


module.exports = {sortBy};
