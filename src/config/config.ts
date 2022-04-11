import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: 'localhost',
    port: 5432,
    username: 'ozono',
    password: 'ozono',
    name: 'ozono',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}));
