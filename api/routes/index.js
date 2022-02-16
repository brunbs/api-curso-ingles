const bodyParser = require('body-parser');
const person = require('./personRoute');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(person);
}