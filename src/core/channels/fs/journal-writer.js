const write = (writer, data, encoding, callback) => {
    let ok = true;
    do {
        i--;
        if (i === 0) {
            // last time!
            writer.write(data, encoding, callback);
        } else {
            // See if we should continue, or wait.
            // Don't pass the callback, because we're not done yet.
            ok = writer.write(data, encoding);
        }
    } while (i > 0 && ok);
    if (i > 0) {
        // had to stop early!
        // write some more once it drains
        writer.once('drain', write);
    }
};

module.exports = {};