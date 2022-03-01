module.exports = class EmailAlreadyInUseException extends Error {
    constructor(message) {
        super(`E-mail already registered`);
        this.name = this.constructor.name;
        this.status = 409;
    }
}