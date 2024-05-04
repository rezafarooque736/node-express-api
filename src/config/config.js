import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigins: process.env.CORS_ORIGINS,
};

export const config = Object.freeze(_config);
