import 'dotenv/config';

/**
 * This file is for typeorm-seeding configuration
 * Just ignore it if you don't have any intention of seeding
 */
export =[
  {
    name: 'default',
    type: process.env.RDS_DB_TYPE,
    url: process.env.RDS_DB_CONNECTION_STRING,
    entities: [`${__dirname}/**/*.entity.{js,ts}`],
    synchronize: process.env.TYPEORM_SYNC,
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
    "cli": {
      migrationsDir: "src/database/migrations"
    }
  }
]