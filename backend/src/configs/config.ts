import * as process from 'node:process';

import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 5050,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'access secret',
    accessTokenExpiration:
      parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRATION) || 36000,
    refreshTokenSecret:
      process.env.AUTH_REFRESH_TOKEN_SECRET || 'refresh secret',
    refreshTokenExpiration:
      parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRATION) || 86400,
    forgotTokenSecret: process.env.AUTH_FORGOT_TOKEN_SECRET || 'forgot secret',
    forgotTokenExpiration:
      parseInt(process.env.AUTH_FORGOT_TOKEN_EXPIRATION) || 20000,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    region: process.env.AWS_S3_REGION,
  },

  smtp: {
    smtp_user: process.env.SMTP_USER,
    smtp_password: process.env.SMTP_PASSWORD,
    front_url: process.env.FRONT_URL,
  },
  superUser: {
    email: process.env.SUPER_USER_EMAIL,
    password: process.env.SUPER_USER_PASSWORD,
  },
});
