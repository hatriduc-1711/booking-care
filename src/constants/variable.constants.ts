import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const URL_REACT = process.env.URL_REACT;
const API = process.env.API;

const ACCESS_KEY_SECRET = process.env.ACCESS_KEY_SECRET;
const REFRESH_KEY_SECRET = process.env.REFRESH_KEY_SECRET;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME as string;
const DB_DIALECT = 'mysql';

const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const EMAIL = process.env.EMAIL;

export {
  PORT,
  URL_REACT,
  API,
  ACCESS_KEY_SECRET,
  REFRESH_KEY_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  EMAIL_APP_PASSWORD,
  EMAIL,
};
