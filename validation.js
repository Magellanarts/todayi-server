// Validation
const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .required(),
    lastName: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });

  // Validate data before creating a user
  return schema.validate(data, { errors: { label: 'key' } });
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });

  // Validate data before creating a user
  return schema.validate(data);
};

// Entry Validation
const entryValidation = (data) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    date: Joi.string()
      .min(6)
      .required(),
  });

  // Validate data before creating a user
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;

module.exports.entryValidation = entryValidation;
