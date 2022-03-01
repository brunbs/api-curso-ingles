const bodyParser = require('body-parser');
const person = require('./personRoute');
const level = require('./levelRoute');
const classRoute = require('./classRoute');
const ErrorHandler = require('../error/ErrorHandler');

module.exports = app => {
    app.use(
        bodyParser.json(),
        person,
        level,
        classRoute,
        ErrorHandler
    );
}