import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  loginJwtSecret: process.env.LOGIN_JWT_SECRET,
  recoveryJwtSecret: process.env.RECOVERY_JWT_SECRET,
  googleAppPassword: process.env.GOOGLE_APP_PASSWORD,
  emailFrom: process.env.EMAIL_FROM,
  emailTo: process.env.EMAIL_TO,
};
