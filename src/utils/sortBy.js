function sortBy(sortBy, mapping = v => v) {
    return (a, b) => +(mapping(a[sortBy]) > mapping(b[sortBy])) || +(mapping(a[sortBy]) === mapping(b[sortBy])) - 1;
}

module.exports = {sortBy};
