const Joi = require("@hapi/joi");

const validateNewUser = (userData) => {
    const userJoiSchema = {
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
    };

    return Joi.validate(userData, userJoiSchema);
}

const validateLoginUser = (userData) => {
    const userJoiSchema = {
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
    };

    return Joi.validate(userData, userJoiSchema);
}

module.exports.validateNewUser = validateNewUser;
module.exports.validateLoginUser = validateLoginUser;