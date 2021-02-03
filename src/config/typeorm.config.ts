import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  RDS_DB_TYPE,
  TYPEORM_SYNC,
  RDS_DB_CONNECTION_STRING
} from '@common/environments'
import { join } from 'path';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: <any>RDS_DB_TYPE,
  url: RDS_DB_CONNECTION_STRING,
  entities: [join(__dirname, "../", "**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "../", "database/migrations/**/*.ts")],
  synchronize: TYPEORM_SYNC,
  dropSchema: false,
  migrationsRun: false,
  "cli": {
    migrationsDir: "src/database/migrations"
  },
  /* Optional for development */
  // ssl: {
  //   rejectUnauthorized: false
  // }
}

export = typeOrmConfig