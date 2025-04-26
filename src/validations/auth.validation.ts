import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ 
    abortEarly: false 
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ 
    abortEarly: false 
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).options({
  abortEarly: false,
});
