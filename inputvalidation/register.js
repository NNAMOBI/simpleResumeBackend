const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
    name: Joi.string().min(4).max(30).required(),
    email: Joi.string().trim().max(50).required().email({ minDomainSegments: 2 }),
    message: Joi.string()

})

module.exports = schema;