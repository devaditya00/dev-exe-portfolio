import dotenv from 'dotenv'

dotenv.config();

const requiredVars = [
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
];

requiredVars.forEach((key) => {
    if(!process.env[key]) {
        console.error(` Missing required env var: ${key}`);
        process.exit(1);
    }
});

export const ENV = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailTo: process.env.EMAIL_TO,
}


