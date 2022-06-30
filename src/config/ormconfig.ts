import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'ozono',
  password: process.env.DB_PASSWORD || 'ozono',
  name: process.env.DB_NAME || 'ozono',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: true,
  },
};

export = config;
