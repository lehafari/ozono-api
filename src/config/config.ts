import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'ozono',
    password: process.env.DB_PASSWORD || 'ozono',
    name: process.env.DB_NAME || 'ozono',
    ssl: {
      rejectUnauthorized: process.env.DB_SSL ? true : false,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
}));
