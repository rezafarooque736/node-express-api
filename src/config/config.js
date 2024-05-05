import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI,
  corsOrigins: process.env.CORS_ORIGINS,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

export const config = Object.freeze(_config);
