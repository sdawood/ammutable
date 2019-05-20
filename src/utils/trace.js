const show = (...args) => console.log('DEBUG::', aLine(), ...args.map(arg => typeof arg !== 'string' ? JSON.stringify(arg, null, 0) : arg));
const aLine = (length = 5) => {
    const a = [];
    a.length = 10;
    a.fill('-');
    return a.join('');
};

module.exports = {
    show: () => {},
    aLine
};

