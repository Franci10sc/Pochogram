const moment = require('moment');
const helpers = {};
//mostrar tiempo desde que se creo
helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;