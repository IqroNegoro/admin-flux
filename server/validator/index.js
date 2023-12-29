import validator from "validator";

export default object => {
        Object.entries(object).forEach(v => {
            if (typeof v[1] == "object") {
                Object.entries(v[1]).forEach(vv => {
                    if (Buffer.isBuffer(object[v[0]][vv[0]])) return;
                        let filter = validator.escape(object[v[0]][vv[0]]);
                        filter = validator.trim(filter);
                        object[v[0]][vv[0]] = filter
                    })
                } else {
                    let filter = validator.escape(v[1]);
                    filter = validator.trim(filter);
                    object[v[0]] = filter
                }
            }
        )

    return {
        result: object,
        errors: {},
        hasErr() {
            if (Object.keys(this.errors).length) {
                this.result = this.errors,
                this.errors = {};
                return true;
            } else {
                return false;
            }
        },
        isEmail(key, message) {
            if (!validator.isEmail(object[key])) {
                this.errors[key] = message
            }
            return this;
        },
        isEmpty(key, message) {
            if (validator.isEmpty(object[key])) {
                this.errors[key] = message
            }
            return this;
        },
        isAlphanumeric(key, message) {
            if (validator.isAlphanumeric(object[key], "en-US", {ignore: /\s/gi})) {
                this.errors[key] = message
            }
            return this;
        },
        isAlpha(key, message) {
            if (!validator.isAlpha(object[key], "en-US", {ignore: /\s/gi})) {
                this.errors[key] = message
            }
            return this;
        },
        isLength(key, options = undefined, message) {
            if (!validator.isLength(object[key], options)) {
                this.errors[key] = message
            }
            return this;
        },
        isNum(key, message) {
            if (!validator.isNumeric(object[key], {no_symbols: true})) {
                this.errors[key] = message
            }
            return this;
        }
    }
}