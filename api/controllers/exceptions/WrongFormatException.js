module.exports = class WrongFormatException extends Error {
    constructor(message) {
        super(`${message} must be a number`);
        this.name = this.constructor.name;
        this.status = 400;
    }
}