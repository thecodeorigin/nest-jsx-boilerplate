import {
  RDS_DB_TYPE,
  TYPEORM_SYNC,
  RDS_DB_CONNECTION_STRING
} from '@common/environments'
import { join } from 'path'

const seedingConfig = {
  name: 'seeding',
  type: RDS_DB_TYPE,
  url: RDS_DB_CONNECTION_STRING,
  synchronize: TYPEORM_SYNC,
  entities: [join(__dirname, "../", "**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "../", "database/migrations/**/*.ts")],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
}

export = seedingConfig