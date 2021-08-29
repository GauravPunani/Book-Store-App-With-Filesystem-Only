const Joi = require('joi');

const createBookSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.string().required(),
});

const updateBookSchema = Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.string().required(),
});



module.exports = {
    createBookSchema,
    updateBookSchema
};