const utils = require('./utils');
const {Writer} = require('./core/virtual/Sentient');
const {MultiWriter} = require('./core/virtual/SentientBatch');
const {shredder, unshredder, Unprism} = require('./core/virtual/SentientContainer');
module.exports = {
    internal: utils,
    Writer,
    MultiWriter,
    shredder,
    unshredder
};
