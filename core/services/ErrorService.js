class ErrorService {

    errors = [];

    add(message) {
        this.errors.push(message);
    }

    getAll() {
        return this.errors;
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    clear() {
        this.errors = [];
    }

}