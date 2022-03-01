module.exports = class NotFoundException extends Error {
    constructor(message) {
        super(`${message} not found`);
        this.name = this.constructor.name;
        this.status = 404;
    }
}