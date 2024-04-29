export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
  aws: AWSConfig;
  superUser: SuperUserConfig;
  smtp: EmailConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type JWTConfig = {
  accessTokenSecret: string;
  accessTokenExpiration: number;
  refreshTokenSecret: string;
  refreshTokenExpiration: number;
  forgotTokenSecret: string;
  forgotTokenExpiration: number;
};

export type AWSConfig = {
  accessKey: string;
  secretKey: string;
  bucket: string;
  region: string;
};

export type EmailConfig = {
  smtp_user: string;
  smtp_password: string;
  front_url: string;
};

export type SuperUserConfig = {
  email: string;
  password: string;
};
