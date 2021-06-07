const Joi = require('@hapi/joi');

const minPwdLen = 6;

exports.registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(minPwdLen).required(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(minPwdLen).required()
});

exports.createBookSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string()
});

exports.updateBookSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string()
});