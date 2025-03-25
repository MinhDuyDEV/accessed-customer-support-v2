import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  APP_NAME: Joi.string().default('customer-support-api'),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('v1'),
  BASE_URL: Joi.string().uri().optional(),
  CORS_ENABLED: Joi.boolean().default(false),
  CORS_ORIGINS: Joi.string().optional(),

  DATABASE_PORT: Joi.number().port().default(27017),
  DATABASE_USERNAME: Joi.alternatives()
    .try(Joi.string().allow('', 'null'), Joi.any().valid(null))
    .default(''),
  DATABASE_PASSWORD: Joi.alternatives()
    .try(Joi.string().allow('', 'null'), Joi.any().valid(null))
    .default(''),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_NAME: Joi.string().default('accessed-customer-support'),
  DATABASE_URI: Joi.string().optional(),
  DATABASE_AUTH_SOURCE: Joi.string().default('admin'),

  UPLOAD_DIR: Joi.string().default('uploads'),
  MAX_FILE_SIZE: Joi.number().default(5 * 1024 * 1024),
  ALLOWED_MIME_TYPES: Joi.string().optional(),
});

export const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
};
